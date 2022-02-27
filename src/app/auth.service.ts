import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ForgotPasswordModel } from './models/forgot.password.model';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}


  // register(registerDto: RegisterDto): Observable<void> {
  //   return this.httpClient.post<void>(
  //     `${environment.apiUrl}/auth/register`,
  //     registerDto
  //   );
  // }

  forgotPassword(model: ForgotPasswordModel): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.apiUrl}/auth/forgot-password`,
      model
    )
  }

}
