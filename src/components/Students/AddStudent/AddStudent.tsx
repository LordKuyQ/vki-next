// 'use client';

// import { useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import { getGroupsApi } from '@/api/groupsApi';
// import type StudentInterface from '@/types/StudentInterface';
// import type GroupInterface from '@/types/GroupInterface';
// import styles from './AddStudent.module.scss';

// interface AddStudentProps {
//   onStudentAdded: (student: Omit<StudentInterface, 'id'> & { uuid?: string }) => void;
// }



//   return (
//     <div className={styles.addStudent}>
//       <button 
//         onClick={handleOpen}
//         className={styles.addButton}
//         disabled={isLoading}
//       >
//         {isOpen ? 'Отмена' : '+ Добавить студента'}
//       </button>

//       {isOpen && (
//         <div className={styles.formContainer}>
//           <form onSubmit={handleSubmit} className={styles.form}>
//             <h3 className={styles.title}>Добавить нового студента</h3>
            
//             <div className={styles.field}>
//               <label htmlFor="last_name" className={styles.label}>
//                 Фамилия *
//               </label>
//               <input
//                 type="text"
//                 id="last_name"
//                 name="last_name"
//                 value={formData.last_name}
//                 onChange={handleInputChange}
//                 className={styles.input}
//                 required
//               />
//             </div>

//             <div className={styles.field}>
//               <label htmlFor="first_name" className={styles.label}>
//                 Имя *
//               </label>
//               <input
//                 type="text"
//                 id="first_name"
//                 name="first_name"
//                 value={formData.first_name}
//                 onChange={handleInputChange}
//                 className={styles.input}
//                 required
//               />
//             </div>

//             <div className={styles.field}>
//               <label htmlFor="middle_name" className={styles.label}>
//                 Отчество
//               </label>
//               <input
//                 type="text"
//                 id="middle_name"
//                 name="middle_name"
//                 value={formData.middle_name}
//                 onChange={handleInputChange}
//                 className={styles.input}
//               />
//             </div>

//             <div className={styles.field}>
//               <label htmlFor="groupId" className={styles.label}>
//                 Группа *
//               </label>
//               <select
//                 id="groupId"
//                 name="groupId"
//                 value={formData.groupId}
//                 onChange={handleInputChange}
//                 className={styles.select}
//                 required
//               >
//                 <option value="">Выберите группу</option>
//                 {groups.map(group => (
//                   <option key={group.id} value={group.id}>
//                     {group.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className={styles.buttons}>
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 className={styles.cancelButton}
//                 disabled={isLoading}
//               >
//                 Отмена
//               </button>
//               <button
//                 type="submit"
//                 className={styles.submitButton}
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Добавление...' : 'Добавить'}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddStudent;