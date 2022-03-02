export class Register {
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

export class Login {
    email: string;
    password: string;

    constructor(data: any) {
        this.email = data.email;
        this.password = data.password;
    }
}

export class Forgot {
    email: string;

    constructor(data: any) {
        this.email = data.email
    }
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export class Reset {
    newPassword: string;

    constructor(data: any) {
        this.newPassword = data.passvord
    }
}