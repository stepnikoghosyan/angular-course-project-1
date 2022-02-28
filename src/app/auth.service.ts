import {Injectable} from '@angular/core';
import {LoginDto, LoginResponse, RegisterDto} from "./models/auth.model";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  login(loginDto: LoginDto): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, loginDto)
      .pipe(
        tap((data: LoginResponse) => {
            localStorage.setItem('auth', JSON.stringify(data));
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
    this.router.navigateByUrl('/login');
  }

  verifyAccount(activationToken: string): Observable<void> {
    return this.httpClient.get<void>(`${environment.apiUrl}/auth/verify-account`, {
        params: {
          activationToken,
        }
      }
    );
  }
}
