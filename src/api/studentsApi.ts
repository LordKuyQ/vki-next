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
    console.log('>>> getGroupsApi', err);
    return [] as StudentInterface[];
  }
};

export const deleteStudentApi = async (studentId: number): Promise<number> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students/${studentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    return studentId;
  }
  catch (err) {
    console.log('>>> deleteStudentApi', err);
    return -1;
  }
};


export const addStudentApi = async (studentData: Omit<StudentInterface, 'id'>): Promise<StudentInterface> => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API}students`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('>>> addStudentApi error response:', errorText);
      throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}. ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error('>>> addStudentApi catch error:', err);
    throw err;
  }
};

export const editStudentApi = async (studentData: Omit<StudentInterface, 'id'>): Promise<StudentInterface> => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API}students`;

    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('>>> addStudentApi error response:', errorText);
      throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}. ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error('>>> addStudentApi catch error:', err);
    throw err;
  }
};