'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import Student from './Student/Student';

const Students = (): React.ReactElement => {
  const { students, isLoading, error, refetch, deleteStudent, addStudent } = useStudents();

  const onAddHandler = (): void => {
    if (confirm('Добавть студента?')) {
      const newStudent: Omit<StudentInterface, 'id'> = {
        firstName: "John",
        lastName: "LName", 
        middleName: "middleName",
        groupId: 1
      };
      addStudent(newStudent);
    }
  };

  const onDeleteHandler = (studentId: number): void => {
    if (confirm('Удалить студента?')) {
      deleteStudent(studentId);
    }
  };

  return (
    <div>
      {students.map((student: StudentInterface) => (
        <Student
          key={student.id}
          student={student}
          onDelete={onDeleteHandler}
        />
      ))}
      <button onClick={onAddHandler}>Добавить студента</button>
    </div>
  );
};

export default Students;