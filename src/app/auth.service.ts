import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginDto, LoginResponse, RegisterDto } from './module/pages';


@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) { 
    
  }
  notifivationMessage:boolean=false;
  login(LoginDto:LoginDto):Observable<any>{
    return this.httpClient
    .post<LoginResponse>(`${environment.apiUrl}/auth/login`, LoginDto)
    .pipe(
      tap((data: LoginResponse)=>{
     localStorage.setItem('loginUser', data.accessToken);//token pahum em localum
     this.router.navigateByUrl('/home')
    
      })
     )
    };
  register(registerDto: RegisterDto): Observable<void>{
   return this.httpClient.post<void>(`${environment.apiUrl}/auth/register`, registerDto)
   .pipe(
    tap(()=>{
      
       this.router.navigateByUrl('/auth/login');   
        })
    );
    
  };
  
logOut(){
  localStorage.removeItem('userInf');
  this.router.navigateByUrl('/auth/login');
  
}



}