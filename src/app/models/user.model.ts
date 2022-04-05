export class UserModelDto {

  email: string;
  firstName: string;
  id: number;
  lastName: string;
  profilePictureUrl: string | null;
  activatedAt?: string | null;
  
  constructor(data:any) {
    this.email = data.email;
    this.firstName = data.firstName;
    this.id = data.id;
    this.lastName = data.lastName;
    this.profilePictureUrl = data.profilePictureUrl;
    this.activatedAt = data.activatedAt;
  }
}

