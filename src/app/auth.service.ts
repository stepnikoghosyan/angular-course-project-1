import { HttpClient } from '@angular/common/http';
import { localizedString } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginDto, LoginResponse, RegisterDto } from './module/pages';


@Injectable()
export class AuthService {
  isLoading = new Subject<boolean>();
  constructor(private httpClient: HttpClient, private router: Router) { 
    
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
    .pipe(
      tap((response)=>{
        console.log(response)
        if(response.status==="200"){
          this.router.navigateByUrl('login')
        }else{
          console.log("error")
        }    
        })
      )
  }
  
  logOut() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
// take accesToken then use in guard
  isLoggedIn() {
    return localStorage.getItem('access_token') != null;
  }

   
show() {
    this.isLoading.next(true);
}
hide() {
    this.isLoading.next(false);
}

}
