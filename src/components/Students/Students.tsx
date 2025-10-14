'use client';

import useStudents from '@/hooks/useStudents';
import useAddStudent from '@/hooks/useAddStudent';
import type StudentInterface from '@/types/StudentInterface';
import Student from './Student/Student';

const Students = (): React.ReactElement => {
  const { students, deleteStudentMutate } = useStudents();
  const { addStudentMutate, isAdding } = useAddStudent();

  const onAddHandler = (): void => {
    if (confirm('Добавть студента?')) {
      const newStudent: Omit<StudentInterface, 'id'> = {
        firstName: "John",
        lastName: "LName", 
        middleName: "middleName",
        groupId: 1
      };
      addStudentMutate(newStudent);
    }
  };

  const onDeleteHandler = (studentId: number): void => {
    if (confirm('Удалить студента?')) {
      deleteStudentMutate(studentId);
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