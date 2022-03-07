import { HttpClient } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { localizedString } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginDto, LoginResponse, RegisterDto, ResendActivationTokenDto } from './module/pages';


@Injectable()
export class AuthService {
  isLoading = new Subject<boolean>();
 
  constructor(private httpClient: HttpClient, private router: Router, private activatedRoute:ActivatedRoute) { 
    
  }
 
  login(LoginDto:LoginDto):Observable<any>{
    return this.httpClient
    .post<LoginResponse>(`${environment.apiUrl}/auth/login`, LoginDto)
    .pipe(
      tap((data: LoginResponse)=>{
     localStorage.setItem('access_token', JSON.stringify(data));//token pahum em localum
     this.router.navigateByUrl('/users')
    
      })
     )
    };
  register(registerDto: RegisterDto): Observable<void>{
   return this.httpClient.post<void>(`${environment.apiUrl}/auth/register`, registerDto)
  
  };
  verifyAccount(activationToken:string): Observable<any>{
    return this.httpClient.get<any>(`${environment.apiUrl}/auth/verify-account`,{
        params: {
          activationToken,
        }
    })
   
  };
  resendActivationToken(data:ResendActivationTokenDto):Observable<any>{
    return this.httpClient.post<any>(`${environment.apiUrl}/auth/resend-activation-token`,ResendActivationTokenDto)
     
    };
  
  logOut() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
// take accessToken then use in guard
  isLoggedIn() {
    return localStorage.getItem('access_token') != null;
  }
//// show or hide spinner ////
    
  show() {
      this.isLoading.next(true);
  }
  hide() {
      this.isLoading.next(false);
  }

}
