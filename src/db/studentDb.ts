import sqlite3 from 'sqlite3';

import type StudentInterface from '@/types/StudentInterface';

sqlite3.verbose();

export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const students = await new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM student';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(rows);
      db.close();
    });
  });


  return students as StudentInterface[];
};


export const deleteStudentDb = async (id: number): Promise<{ success: boolean }> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  try {
    await new Promise((resolve, reject) => {
      const sql = 'DELETE FROM student WHERE id = ?';
      db.run(sql, [id], function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve({ success: true });
      });
    });
    return { success: true };
  } finally {
    db.close();
  }
};