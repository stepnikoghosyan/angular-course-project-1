import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../modules/main/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: UserModel | null = null;

  constructor(private httpClient: HttpClient) {
    this.getUserProfile();
  }

  getUserProfile(): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${environment.apiUrl}/users/my-profile`)
      .pipe(tap((user: UserModel) => {
        this.user = user;
      }));
  }
  
  getUser(): UserModel | null {
    return this.user;
  }
}
