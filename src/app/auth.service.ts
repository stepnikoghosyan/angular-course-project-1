import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginDto, RegisterDto } from './login/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient, private router: Router) { }

  login(LoginDto:LoginDto) {
   return this.httpClient.post(`${environment.apiUrl}/auth/login`, LoginDto)
   .pipe(
    tap((data)=>{
     localStorage.setItem('auth', JSON.stringify(data))
     this.router.navigateByUrl('login')
   })
   )
  }
  verifyAccount(activationToken: string) {
    return this.httpClient.get<void>(
      `${environment.apiUrl}/auth/verify-account`,
      {
        params: {
          activationToken,
        },
      }
    );
  }

  register(RegisterDto:RegisterDto){
    return this.httpClient.post(`${environment.apiUrl}/auth/register`, RegisterDto)
  }
}
