export class LoginDto {
  email: string;
  password: string;

  constructor(data: any) {
    this.email = data.email;
    this.password = data.password;
  }
}

export class RegisterDto extends LoginDto {
  firstName: string;
  lastName: string;

  constructor(data: any) {
    super(data);
    this.firstName = data.firstName;
    this.lastName = data.lastName;
  }
}

export class PasswordDto {
  password: string;

  constructor(data: any) {
    this.password = data.password;
  }
}

export class EmailDto {
  email: string;

  constructor(data: any) {
    this.email = data.email;
  }
}

export class ResetPasswordDto {
  token: string;
  newPassword: string;

  constructor(data: any) {
    this.token = data.token;
    this.newPassword = data.newPassword;
  }
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
