import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Login, Register } from '../models/auth.model';
import {environment} from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http:HttpClient) { }
  private readonly  baseUrl:string = environment.Api_Url;

  login(body:Login) {
    return this.http.post(`${this.baseUrl}auth/login`,body)
  }

  register(body:Register) {
    return this.http.post(`${this.baseUrl}auth/register`,body)
  }

  verifyAccount(activationToken:string){
    return this.http.get(`${this.baseUrl}auth/verify-account?activationToken=${activationToken}`)
  }

  resendActivation(body:any){
    return this.http.post(`${this.baseUrl}auth/resend-activation-token`,body)
  }

}
