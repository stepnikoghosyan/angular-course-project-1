import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) {}

  getMyProfile(): Observable <UserModel>{
    return this.httpClient.get<UserModel>(`${environment.apiUrl}/users/my-profile`)
  }
}
