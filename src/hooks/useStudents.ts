
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { addStudentApi, deleteStudentApi, editStudentApi, getStudentsApi } from '@/api/studentsApi';
import type StudentInterface from '@/types/StudentInterface';
import queryClient from '@/api/reactQueryClient';

interface StudentsHookInterface {
  students: StudentInterface[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  deleteStudent: (studentId: number) => void;
  addStudent: (student: Omit<StudentInterface, 'id'> & { uuid?: string }) => void;
  editStudent: (student: Omit<StudentInterface, 'id'> & { uuid?: string }) => void;
}

const useStudents = (): StudentsHookInterface => {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['students'],
    queryFn: () => getStudentsApi(),
    enabled: true,
  });

  /**
   * Мутация удаления студента
   */
  const deleteStudentMutate = useMutation({
    // вызов API delete
    mutationFn: async (studentId: number) => deleteStudentApi(studentId),
    // оптимистичная мутация (обновляем данные на клиенте до API запроса delete)
    onMutate: async (studentId: number) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      // получаем данные из TanStackQuery
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
      let updatedStudents = [...(previousStudents ?? [])];

      if (!updatedStudents) return;

      // помечаем удаляемую запись
      updatedStudents = updatedStudents.map((student: StudentInterface) => ({
        ...student,
        ...(student.id === studentId ? { isDeleted: true } : {}),
      }));
      // обновляем данные в TanStackQuery
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);

      return { previousStudents, updatedStudents };
    },
    onError: (err, variables, context) => {
      console.log('>>> deleteStudentMutate  err', err);
      queryClient.setQueryData<StudentInterface[]>(['students'], context?.previousStudents);
    },
    // обновляем данные в случаи успешного выполнения mutationFn: async (studentId: number) => deleteStudentApi(studentId),
    onSuccess: async (studentId, variables, { previousStudents }) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      // вариант 1 - запрос всех записей
      // refetch();

      // вариант 2 - удаление конкретной записи
      if (!previousStudents) {
        return;
      }
      const updatedStudents = previousStudents.filter((student: StudentInterface) => student.id !== studentId);
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);
    },
    // onSettled: (data, error, variables, context) => {
    //   // вызывается после выполнения запроса в случаи удачи или ошибке
    //   console.log('>> deleteStudentMutate onSettled', data, error, variables, context);
    // },
  });
  
  /**
   * Мутация добавления студента
  */
 const addStudentMutation = useMutation({
  // вызов API add
   mutationFn: async (student: Omit<StudentInterface, 'id'> & { uuid?: string }) => addStudentApi(student),
   // оптимистичная мутация (обновляем данные на клиенте до API запроса add)
   onMutate: async (newStudent: Omit<StudentInterface, 'id'> & { uuid?: string }) => {
     await queryClient.cancelQueries({ queryKey: ['students'] });
     // получаем данные из TanStackQuery
     const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
     const uuid = newStudent.uuid || uuidv4();
     const optimisticStudent = { id: -1, uuid, ...newStudent } as StudentInterface;

     // обновляем данные в TanStackQuery
     queryClient.setQueryData<StudentInterface[]>(
       ['students'],
       [optimisticStudent, ...(previousStudents ?? [])]
      );
      return { previousStudents, uuid };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData<StudentInterface[]>(['students'], context?.previousStudents);
    },
    onSuccess: (createdStudent, _variables, context) => {
      const prev = queryClient.getQueryData<StudentInterface[]>(['students']) ?? [];
      const replaced = prev.map(s => (s.uuid === context?.uuid ? createdStudent : s));
      queryClient.setQueryData<StudentInterface[]>(['students'], replaced);
    },
  });


  /**
   * Мутация редактирования студента
  */
 const editStudentMutation = useMutation({
   mutationFn: async (student: Omit<StudentInterface, 'id'> & { uuid?: string }) => editStudentApi(student),
   onMutate: async (newStudent: Omit<StudentInterface, 'id'> & { uuid?: string }) => {
     await queryClient.cancelQueries({ queryKey: ['students'] });

     // получаем данные из TanStackQuery
     const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
     const uuid = newStudent.uuid || uuidv4();
     const optimisticStudent = { id: -1, uuid, ...newStudent } as StudentInterface;

     // обновляем данные в TanStackQuery
     queryClient.setQueryData<StudentInterface[]>(
       ['students'],
       [optimisticStudent, ...(previousStudents ?? [])]
      );
      return { previousStudents, uuid };
    },

    onError: (_err, _variables, context) => {
      queryClient.setQueryData<StudentInterface[]>(['students'], context?.previousStudents);
    },
    onSuccess: (createdStudent, _variables, context) => {
      const prev = queryClient.getQueryData<StudentInterface[]>(['students']) ?? [];
      const replaced = prev.map(s => (s.uuid === context?.uuid ? createdStudent : s));
      queryClient.setQueryData<StudentInterface[]>(['students'], replaced);
    },
  });




  return {
    students: data ?? [],
    isLoading,
    error: (error as Error) ?? null,
    refetch,
    deleteStudent: deleteStudentMutate.mutate,
    addStudent: addStudentMutation.mutate,
    editStudent: editStudentMutation.mutate,
  };
};
  
  export default useStudents;
  