export class ResetPasswordDto{
    newPassword: string;
    token: string;

    constructor(data:any){
        this.newPassword = data.newPassword;
        this.token = data.token 
    }
};
export class ForgotPasswordDto{
    email: string;
    
    constructor(data:any){
        this.email = data.email
    }
};
export class RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor(data:any){
        this.firstName = data.firstName,
        this.lastName = data.lastName,
        this.email = data.email,
        this.password = data.password
    }
};

export class LoginDto {
    email: string;
    password: string;

    constructor(data: any){
        this.email = data.email;
        this.password = data.password;
    }
};
export interface LoginResponse{
    accessToken: string,
    refreshToken: string
};

export class EmailDto {
    email:string;

    constructor(data:any) {
       this.email = data.email;
    }
};

// export class CommentDto {
//     postId: number;
//     password: string;

//     constructor(data: any){
//         this.postId = data.postId;
//         this.password = data.password;
//     }
// }