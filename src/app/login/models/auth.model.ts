export class RegisterDto {
    firstName : string;
    lastName : string;
    email:string;
    password : string;
    

    constructor(data:any) {
        this.firstName=data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.password = data.password;
    }
}

export class LoginDto {
    email:string;
    password : string;
    

    constructor(data:any) {
        this.email = data.email;
        this.password = data.password;
    }
}