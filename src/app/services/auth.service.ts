import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { LoginDto, RegisterDto, ForgotDto, ResetDto, LoginResponse } from '../models/auth.model';
import { environment } from '../../environments/environment'
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isRemember = false;

  constructor(
    private notifyService: NotificationService,
    private httpClient: HttpClient,
    private router: Router,
  ) { }
  private readonly baseUrl: string = environment.Api_Url;


  login(loginDto: LoginDto): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.baseUrl}auth/login`, loginDto)
      .pipe(tap((res) => {
        if (this.isRemember) {
          localStorage.setItem('auth', res.accessToken);
        } else {
          sessionStorage.setItem('auth', res.accessToken)
        }
        this.router.navigate(['/home']);
      }))
  }


  register(body: RegisterDto, isLoading: boolean) {
    return this.httpClient.post(`${this.baseUrl}auth/register`, body)
      .pipe(tap(() => {
        isLoading = false;
        this.notifyService.showSuccess('Please check your email for verification', 'Success');
        this.router.navigate(['auth/login']);
      }))
  }

  verifyAccount(activationToken: string, isLoading: boolean) {
    return this.httpClient.get(`${this.baseUrl}auth/verify-account?activationToken=${activationToken}`)
    .pipe(tap(()=> {
      this.notifyService.showSuccess('Your verification Succeded', 'Succes');
      isLoading = false;
      setTimeout(() => {
        this.router.navigate(['auth/login']);
      }, 3000);
    }))
  }

  resendActivation(body: ForgotDto) {
    return this.httpClient.post(`${this.baseUrl}auth/resend-activation-token`, body)
    .pipe(tap(()=>{
      this.notifyService.showSuccess('Your verification Succeded', 'Succes');
      this.router.navigate(['auth/login']);
      
    }))
  }

  forgotPassword(body: ForgotDto) {
    return this.httpClient.post(`${this.baseUrl}auth/forgot-password`, body)
    .pipe(tap(() => {
      this.notifyService.showSuccess('Your password was successfully reseted', 'success');
      this.router.navigate(['/home']);
    }))

  }
  resetPassword(activationToken: ResetDto, isLoading:boolean) {
    return this.httpClient.post(`${this.baseUrl}auth/reset-password?activationToken=${activationToken.token}`, activationToken)
    .pipe(tap(()=>{
      isLoading = false;
      this.notifyService.showSuccess("Success", "Password is changed");
      this.router.navigateByUrl('/home');
    }))
  }

}
