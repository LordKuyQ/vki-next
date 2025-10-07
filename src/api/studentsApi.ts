import { DELETE } from '@/app/api/students/[id]/route';
import ChildrenType from '@/types/ChildrenType';
import type StudentInterface from '@/types/StudentInterface';

export const getStudentsApi = async (): Promise<StudentInterface[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const students = await response.json() as StudentInterface[];
    return students;
  }
  catch (err) {
    console.log('>>> getStudentsApi', err);
    return [] as StudentInterface[];
  }
};

export const deleteStudentApi = async (studentId: number): Promise<number> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students/${studentId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    };
    return studentId;
  }
  catch (err) {
    console.log('>>> deleteStudentsApi', err);
    return -1;
  }
};