import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient: HttpClient,
  ) { }
  private readonly baseUrl: string = environment.Api_Url;

  userGetProfile() {
    return this.httpClient.get(`${this.baseUrl}users/my-profile`)
  }
}
