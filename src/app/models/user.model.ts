export class UserModel {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;

  constructor(data: any) {
    this.id = data.id;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.profilePictureUrl = data.profilePictureUrl;
  }
}
