'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import Student from './Student/Student';

const Students = (): React.ReactElement => {
  const { students, deleteStudentMutate } = useStudents();

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
    </div>
  );
};

export default Students;