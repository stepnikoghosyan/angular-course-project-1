import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Login, Register } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  login(body:Login) {
    return this.http.post('https://angular-course-1.herokuapp.com/auth/login',body)
  }

  register(body:Register) {
    return this.http.post('https://angular-course-1.herokuapp.com/auth/register',body)
  }
}
