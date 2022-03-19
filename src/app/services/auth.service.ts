import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmailDto, LoginDto, LoginResponse, RegisterDto, ResetPasswordDto } from "../models/auth.model";
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private httpClient: HttpClient,
    private userService: UserService,
    private router: Router) {
  }

  login(loginDto: LoginDto, rememberMe: boolean): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, loginDto)
      .pipe(
        tap((data: LoginResponse) => {
          if (rememberMe) {
            localStorage.setItem('auth', JSON.stringify(data));
          } else {
            sessionStorage.setItem('auth', JSON.stringify(data));
          }
          this.router.navigateByUrl('/home');
        }
        )
      );
  }

  register(registerDto: RegisterDto): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiUrl}/auth/register`, registerDto);
  }


  logout() {
    localStorage.removeItem('auth');
    sessionStorage.removeItem('auth');
    this.router.navigateByUrl('/login');
  }

  forgotPassword(emailDto: EmailDto): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.apiUrl}/auth/forgot-password`,
      emailDto
    );
  }

  verifyAccount(token: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/auth/verify-account`, {
      params: {
        activationToken: token
      }
    });
  }

  resendActivationToken(emailDto: EmailDto): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiUrl}/auth/resend-activation-token`,
      emailDto
    );
  }

  resetPassword(resetPasswordDto: ResetPasswordDto): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiUrl}/auth/reset-password`, resetPasswordDto)
  }

  checkIsLoginUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      const item = localStorage.getItem('auth') || sessionStorage.getItem('auth');
      if (!item) {
        resolve();
        return;
      }
      this.userService.getUserProfile().pipe(
        take(1)
      ).subscribe({
        next: () => {
          resolve();
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            resolve();
          } else {
            reject(err);
          }
        }
      })
    })
  }
}
