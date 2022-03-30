import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EmailDto, ForgotPasswordDto, LoginDto, LoginResponse, RegisterDto, ResetPasswordDto } from '../models/auth.model';
import { Observable, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/notification.service';
import { UsersService } from '../../main/services/users.service';
import { StorageService } from '../../main/services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLoggedIn = false;
    myProfileId?: number;

    constructor(private httpClient: HttpClient,
        private router: Router,
        // private notifyService: NotificationService,
        private userService: UsersService,
        private storageService: StorageService,
        ) { }

    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Observable<void> {
        return this.httpClient
            .post<void>(`${environment.apiUrl}/auth/forgot-password`, forgotPasswordDto)
            .pipe(
                tap(() => {
                    // this.notifyService.success("Check your email", "Success!");
                })
            )
    };

    resetPassword(resetPasswordDto: ResetPasswordDto): Observable<void> {
        return this.httpClient.post<void>(`${environment.apiUrl}/auth/reset-password`, resetPasswordDto)
            .pipe(
                tap(() => {
                    // this.notifyService.success("", "Success!!");
                    this.router.navigateByUrl("/home");
                })
            );
    };

    login(loginDto: LoginDto, remember: boolean): Observable<LoginResponse> {

        return this.httpClient.post<LoginResponse>(`${environment.apiUrl}/auth/login`, loginDto)
            .pipe(
                tap((data: LoginResponse) => {
                    const item = JSON.stringify(data);
                    if (remember) {
                        localStorage.setItem("auth", item);
                    } else {
                        sessionStorage.setItem('auth', item);
                    }
                    this.router.navigateByUrl("/main/home");
                    this.isLoggedIn = true
                })
            );
    };

    register(registerDto: RegisterDto): Observable<void> {
        return this.httpClient
            .post<void>(`${environment.apiUrl}/auth/register`, registerDto).pipe(
                tap(() => {
                    // this.notifyService.success("Please check your email", "Succes!!");
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

    verifyAccount(activationToken: string): Observable<void> {
        return this.httpClient
            .get<void>(`${environment.apiUrl}/auth/verify-account`,
                {
                    params: {
                        activationToken
                    }
                })
            .pipe(tap(() => {
                // this.notifyService.success("Account verified", "Success")
                this.router.navigateByUrl('login');
            }))
    };

    resendActivationToken(email: EmailDto) {
        return this.httpClient
            .post<void>(`${environment.apiUrl}/auth/resend-activation-token`, email)
    };

    checkCurrentLoggedInUser(): Promise<void> {
        return new Promise((resolve, reject) => {
            const accessToken = this.storageService.getAccessToken();
            if (!accessToken) {
                resolve();
                return;
            }
            this.userService.getMyProfile()
                .pipe(take(1))
                .subscribe({
                    next: (user) => {
                        resolve(); 
                         this.myProfileId = user.id;
                        // console.log("init data", this.myProfileId, user.id);
                               
                    },
                    error: (err: HttpErrorResponse) => {
                        if (err.status === 401) {
                            resolve();
                            console.log("init rejected");
                            
                        } else {
                            console.log("rejected");        
                            reject(err);
                        }
                    }
                });
        });
    }
}


