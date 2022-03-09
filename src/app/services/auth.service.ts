import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { LoginDto, RegisterDto, ForgotDto, ResetDto, LoginResponse } from '../models/auth.model';
import { environment } from '../../environments/environment'
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isRemember = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }
  private readonly baseUrl: string = environment.Api_Url;


  login(loginDto: LoginDto): Observable<LoginResponse> {
      return this.httpClient.post<LoginResponse>(`${this.baseUrl}auth/login`, loginDto);
  }


  register(body: RegisterDto) {
    return this.httpClient.post(`${this.baseUrl}auth/register`, body);
  }

  verifyAccount(activationToken: string) {
    return this.httpClient.get(`${this.baseUrl}auth/verify-account?activationToken=${activationToken}`);
  }

  resendActivation(body: any) {
    return this.httpClient.post(`${this.baseUrl}auth/resend-activation-token`, body);
  }

  forgotPassword(body: ForgotDto) {
    return this.httpClient.post(`${this.baseUrl}auth/forgot-password`, body);
  }
  resetPassword(activationToken: ResetDto) {
    return this.httpClient.post(`${this.baseUrl}auth/reset-password?activationToken=${activationToken.token}`, activationToken);
  }

}
