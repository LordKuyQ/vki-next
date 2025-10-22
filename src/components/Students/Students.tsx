'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import Student from './Student/Student';
import AddStudent, { type FormFields } from './AddStudent/AddStudent';
import EditStudent from './EditStudent/EditStudent'; 
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

const Students = (): React.ReactElement => {
  const { students, isLoading, error, refetch, deleteStudent, addStudent, editStudent } = useStudents();
  const [editingStudent, setEditingStudent] = useState<StudentInterface | null>(null);

  const onAddHandler = (studentFormField: FormFields): void => {
    console.log('Добавление студента', studentFormField);

    addStudent({
      ...studentFormField,
      groupId: 1,
      uuid: uuidv4(),
    });
  };

  const onEditHandler = (student: StudentInterface): void => {
    setEditingStudent(student);
  };

  const onSaveEditHandler = (updatedStudent: StudentInterface): void => {
    editStudent(updatedStudent);
    setEditingStudent(null); 
  };

  const onCancelEditHandler = (): void => {
    setEditingStudent(null); 
  };

  const onDeleteHandler = (studentId: number): void => {
    if (confirm('Удалить студента?')) {
      deleteStudent(studentId);
    }
  };

  return (
    <div>
      {editingStudent ? (
        <EditStudent
          student={editingStudent}
          onSave={onSaveEditHandler}
          onCancel={onCancelEditHandler}
        />
      ) : (
        <AddStudent onAdd={onAddHandler} />
      )}

      {students.map((student: StudentInterface) => (
        <Student
          key={student.id}
          student={student}
          onDelete={onDeleteHandler}
          onEdit={onEditHandler} 
        />
      ))}
    </div>
  );
};

export default Students;