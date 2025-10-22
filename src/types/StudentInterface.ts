interface StudentInterface {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  groupId: number;
  isDeleted?: boolean;
  uuid?: string;
};

export default StudentInterface;
