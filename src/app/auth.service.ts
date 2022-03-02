import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginDto, registerDto } from './models/auth.model';
import {LoginResponse} from './models/auth.model'


interface LoginModel {
   email: string;
   password: string;
}

interface RegisterModel extends LoginModel {};

@Injectable()

export class AuthService  {

  constructor(private httpClient: HttpClient) { }

  login(LoginDto: LoginDto): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>('https://angular-course-1.herokuapp.com/auth/login', LoginDto)
    
    // setTimeout(() => {
    //  console.log("login", data);
    //  this.router.navigateByUrl('/home')
    //}, 1000)
   
  }

  register(registerDto: registerDto): Observable<void> {
    return this.httpClient.post<void> ('https://angular-course-1.herokuapp.com/auth/register', registerDto)
  }
}
