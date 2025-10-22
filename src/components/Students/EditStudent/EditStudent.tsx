'use client';

import { useState, useEffect } from 'react';
import type StudentInterface from '@/types/StudentInterface';
import type { FormFields } from '../AddStudent/AddStudent';

interface EditStudentProps {
  student: StudentInterface;
  onSave: (student: StudentInterface) => void;
  onCancel: () => void;
}

const EditStudent = ({ student, onSave, onCancel }: EditStudentProps): React.ReactElement => {

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSave({
      ...student, 
    });
  };


  return (
    <form onSubmit={handleSubmit} className="edit-student-form">
      <h3>Редактирование студента</h3>
      

      <div className="form-actions">
        <button type="submit">Сохранить</button>
        <button type="button" onClick={onCancel}>
          Отмена
        </button>
      </div>
    </form>
  );
};

export default EditStudent;