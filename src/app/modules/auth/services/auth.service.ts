import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailDto, ForgotPasswordDto, LoginDto, LoginResponse, RegisterDto, ResetPasswordDto } from '../models/auth.model';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    isLoggedIn = false;
    
    constructor(private httpClient: HttpClient,
                private router: Router,
                private notifyService: NotificationService) {}

    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Observable<void>{
        return this.httpClient
            .post<void>(`${environment.apiUrl}/auth/forgot-password`, forgotPasswordDto)
                .pipe(
                    tap(()=>{
                        this.notifyService.success("Check your email", "Success!");
                    })
                )
    };

    resetPassword(resetPasswordDto: ResetPasswordDto): Observable<void>{
        return  this.httpClient.post<void>(`${environment.apiUrl}/auth/reset-password`, resetPasswordDto)
        .pipe(
            tap(()=>{
                this.notifyService.success("", "Success!!");
                this.router.navigateByUrl("/home");
            })
        );
    };

    login(loginDto: LoginDto, remember:boolean ): Observable<LoginResponse>{

        return this.httpClient.post<LoginResponse>(`${environment.apiUrl}/auth/login`, loginDto)
        .pipe(
            tap((data: LoginResponse)=>{
                const item = JSON.stringify(data);
                if(remember) {
                    localStorage.setItem("auth", item);
                } else {
                    sessionStorage.setItem('auth', item);
                }
                this.router.navigateByUrl("/main/home");
                this.isLoggedIn = true
            })
        );
      };

    register(registerDto: RegisterDto): Observable<void>{
        return this.httpClient
            .post<void>(`${environment.apiUrl}/auth/register`, registerDto).pipe(
                tap(()=>{
                    this.notifyService.success("Please check your email", "Succes!!");
                    this.router.navigateByUrl('/login');
                })
                // catchError
            );
      };

    logout() {
        localStorage.removeItem('auth');
        sessionStorage.removeItem('auth');
        this.router.navigateByUrl('/login');
    };

    verifyAccount(activationToken: string): Observable<void>{
        return this.httpClient
            .get<void>(`${environment.apiUrl}/auth/verify-account`,
            {
               params: {
                activationToken 
               }
            })
            .pipe(tap(()=>{
                this.notifyService.success("Account verified", "Success")
                this.router.navigateByUrl('login');
            }))
        };

      resendActivationToken(email: EmailDto) {
          return this.httpClient
            .post<void>(`${environment.apiUrl}/auth/resend-activation-token`, email)
      };
}

    
