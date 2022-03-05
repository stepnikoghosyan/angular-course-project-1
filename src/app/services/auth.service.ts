import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ForgotPasswordDto, LoginDto, LoginResponse, RegisterDto, ResetPasswordDto } from '../models/auth.model';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient,
        private router: Router) {}


    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Observable<void>{
        return this.httpClient
        .post<void>(`${environment.apiUrl}/auth/forgot-password`, forgotPasswordDto)
    };

    resetPassword(resetPasswordDto: ResetPasswordDto): Observable<void>{
        return  this.httpClient.post<void>(`${environment.apiUrl}/auth/reset-password`, resetPasswordDto)
        .pipe(
            tap(()=>{
                this.router.navigateByUrl("/home")
            }))
    };

    login(loginDto: LoginDto, remember:boolean ): Observable<LoginResponse>{

        return this.httpClient.post<LoginResponse>(`${environment.apiUrl}/auth/login`, loginDto)
        .pipe(
            tap((data: LoginResponse)=>{
                if(remember) {
                localStorage.setItem("auth", JSON.stringify(data))
            } else {
                 sessionStorage.setItem('auth', JSON.stringify(data))
         }
         this.router.navigateByUrl("home")
            }
            )
        );
      };


      register(registerDto: RegisterDto): Observable<void>{
        return this.httpClient
            .post<void>(`${environment.apiUrl}/auth/register`, registerDto);
      };

      logout() {
        localStorage.removeItem('auth');
        this.router.navigateByUrl('/login');
      }

    
      verifyAccount(activationToken: string): Observable<void>{
        return this.httpClient
            .get<void>(`${environment.apiUrl}/auth/verify-account`,
            {
               params: {
                activationToken 
               }
            }
        )
      }

}

    
