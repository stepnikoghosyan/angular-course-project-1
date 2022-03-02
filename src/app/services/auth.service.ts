import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Login, Register, Forgot, Reset, LoginResponse } from '../models/auth.model';
import {environment} from '../../environments/environment'
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private httpClient:HttpClient,
    private router: Router
    ) { }
  private readonly  baseUrl:string = environment.Api_Url;


  login(loginDto: Login): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(`${this.baseUrl}auth/login`, loginDto)
      .pipe(
        tap((data: LoginResponse) => {
          localStorage.setItem('auth', JSON.stringify(data));
          this.router.navigateByUrl('/home');
        })
      );
  }


  register(body:Register) {
    return this.httpClient.post(`${this.baseUrl}auth/register`, body)
  }

  verifyAccount(activationToken:string){
    return this.httpClient.get(`${this.baseUrl}auth/verify-account?activationToken=${activationToken}`)
  }

  resendActivation(body:any){
    return this.httpClient.post(`${this.baseUrl}auth/resend-activation-token`, body)
  }

  forgotPassword(body: Forgot){
    return this.httpClient.post(`${this.baseUrl}auth/forgot-password`, body)
  }
  resetPassword(activationToken:Reset) {
    return this.httpClient.post(`${this.baseUrl}auth/reset-password?activationToken=${activationToken}`, activationToken)
  }

}
