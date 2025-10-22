'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import Student from './Student/Student';
import AddStudent, { type FormFields } from './AddStudent/AddStudent';
import { v4 as uuidv4 } from 'uuid';

const Students = (): React.ReactElement => {
  const { students, isLoading, error, refetch, deleteStudent, addStudent } = useStudents();

  const onAddHandler = (studentFormField: FormFields): void => {
    console.log('Добавление студента', studentFormField);

    addStudent({
      ...studentFormField,
      groupId: 1,
      uuid: uuidv4(),
    });
  };


  const onDeleteHandler = (studentId: number): void => {
    if (confirm('Удалить студента?')) {
      deleteStudent(studentId);
    }
  };

  return (
    <div>
      <AddStudent onAdd={onAddHandler} />

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