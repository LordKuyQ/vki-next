import type StudentInterface from '@/types/StudentInterface';
import styles from './Student.module.scss';

interface Props {
  student: StudentInterface;
  onDelete: (id: number) => void;
  onEdit: (student: StudentInterface) => void;
}

const Student = ({ student, onDelete, onEdit }: Props): React.ReactElement => {
  const onDeleteHandler = (): void => {
    onDelete(student.id);
  };
  const onEditHandler = (): void => {
    onEdit(student);
  };

  return (
     <div className={`${styles.Student} ${student.isDeleted ? styles['--isDeleted'] : '' } `}>
      {`${student.id} - ${student.lastName} ${student.firstName} ${student.middleName}`}
      <div>
        <button onClick={onDeleteHandler}>Удалить</button>
        <button onClick={onEditHandler}>Редактировать</button>
      </div>
    </div>
  );
};

export default Student;