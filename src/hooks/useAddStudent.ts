import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { addStudentApi } from '@/api/studentsApi';
import type StudentInterface from '@/types/StudentInterface';

interface AddStudentHookInterface {
  addStudentMutate: (studentData: Omit<StudentInterface, 'id'>) => void;
  isAdding: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
}

const useAddStudent = (): AddStudentHookInterface => {
  const queryClient = useQueryClient();

  const addStudentMutation = useMutation({
    mutationFn: async (studentData: Omit<StudentInterface, 'id'>) => 
      addStudentApi(studentData),
    
    // Оптимистичное обновление - добавляем студента сразу в кеш
    onMutate: async (newStudentData) => {
      // Отменяем текущие запросы чтобы не было конфликтов
      await queryClient.cancelQueries({ queryKey: ['students'] });
      
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
      
      // Создаем временного студента с временным ID (отрицательным числом)
      const temporaryStudent: StudentInterface = {
        ...newStudentData,
        id: -Date.now(), // Временный отрицательный ID, будет заменен на серверный
      };
      
      // Обновляем кеш, добавляя нового студента
      const updatedStudents = [...(previousStudents || []), temporaryStudent];
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);

      return { previousStudents, temporaryStudent };
    },
    
    onError: (err, variables, context) => {
      console.error('>>> addStudentMutate error', err);
      // В случае ошибки откатываем изменения
      queryClient.setQueryData<StudentInterface[]>(['students'], context?.previousStudents);
    },
    
    onSuccess: (newStudentFromServer, variables, context) => {
      // Получаем текущий кеш
      const currentStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
      
      if (currentStudents && context?.temporaryStudent) {
        // Заменяем временного студента на студента с сервера
        // Временные студенты имеют отрицательный ID
        const updatedStudents = currentStudents.map(student =>
          student.id === context.temporaryStudent.id ? newStudentFromServer : student
        );
        queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);
      }
    },
    
    onSettled: () => {
      // В любом случае инвалидируем кеш чтобы убедиться в актуальности данных
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  return {
    addStudentMutate: addStudentMutation.mutate,
    isAdding: addStudentMutation.isPending,
    isError: addStudentMutation.isError,
    error: addStudentMutation.error,
    isSuccess: addStudentMutation.isSuccess,
  };
};

export default useAddStudent;