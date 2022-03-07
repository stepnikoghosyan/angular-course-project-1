// make prototype of pages with enum
export enum Pages {
    Auth = 1,
    Home, 
    Posts,
    Users,
    Profile,
}
export enum Page2{

}
export interface PageModule{
    id:Pages
    name:string,
}
 
export class LoginDto {
    email:string;
    password:string;
    constructor(data:any){
        this.email = data.email;
        this.password = data.password;
        
    }
  
}
export class RegisterDto extends LoginDto{
    firstName:string;
    lastName:string;

    constructor(data:any){
        super(data)
        this.firstName = data.firstName;
        this.lastName = data.lastName
        this.email = data.email;
        this.password = data.password;

    }
    

}

export interface LoginResponse{
    accessToken:"string",
    refreshToken:"string"
}
export class ResendActivationTokenDto extends LoginDto{
    constructor(data :any){
        super(data)
    }
}