import type StudentInterface from '@/types/StudentInterface';

interface Props {
  student: StudentInterface;
  onDelete: (id: number) => void;
}

const Student = ({ student, onDelete }: Props): React.ReactElement => {
  const onDeleteHandler = (): void => {
    onDelete(student.id);
  };

  return (
    <div>
      {`${student.id} - ${student.last_name} ${student.first_name} ${student.middle_name}`}
      <button onClick={onDeleteHandler}>Удалить</button>
    </div>
  );
};

export default Student;