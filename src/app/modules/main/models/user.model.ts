export interface UserModel {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
}

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture: File | null | string;
}
