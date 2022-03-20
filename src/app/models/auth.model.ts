export class RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor(data: any) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.password = data.password;
    }
}

export class LoginDto {
    email: string;
    password: string;
    checkBox?:boolean;
    constructor(data: any) {
        this.email = data.email;
        this.password = data.password;
        this.checkBox = data.checkBox;
    }
}

export class ForgotDto {
    email: string;

    constructor(data: any) {
        this.email = data.email;
    }
}



export class ResetDto {
    newPassword: string;
    token: string;

    constructor(data: any) {
        this.newPassword = data.newPassword;
        this.token = data.token;
    }
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}