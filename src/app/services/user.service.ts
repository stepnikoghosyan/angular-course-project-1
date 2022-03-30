import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {UserFormData, UserModel} from '../modules/main/models/user.model';
import {convertToFormData} from "../modules/main/helpers/json-to-form-data.helper";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: UserModel | null = null;

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

  updateProfile(formValue: UserFormData): Observable<UserModel> {
    const formData = convertToFormData<UserFormData>(formValue);
    return this.httpClient.put<UserModel>(`${environment.apiUrl}/users`, formData);
  }
}
