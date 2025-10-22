import { editStudentDb, getStudentsDb } from '@/db/studentDb';
import { NextApiRequest } from 'next';
import { addStudentDb } from '@/db/studentDb';
import { editStudentApi } from '@/api/studentsApi';

export async function GET(): Promise<Response> {
  const students = await getStudentsDb();

  return new Response(JSON.stringify(students), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export async function POST(req: NextApiRequest): Promise<Response> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const student = await req.json();

  const newStudent = await addStudentDb(student);

  console.log(newStudent);
  return new Response(JSON.stringify(newStudent), {
    headers: {
    'Content-Type': 'application/json',
    },
  });
};


export async function PUT(req: NextApiRequest): Promise<Response> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const student = await req.json();

  const newStudent = await editStudentDb(student);

  console.log(newStudent);
  return new Response(JSON.stringify(newStudent), {
    headers: {
    'Content-Type': 'application/json',
    },
  });
};
