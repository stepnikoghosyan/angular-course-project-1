import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    public myProfile?: UserModel

    constructor(private httpClient: HttpClient,
        // private notifyService: NotificationService
        ) { }

    getMyProfile(): Observable<UserModel> {
        return this.httpClient.get<UserModel>(`${environment.apiUrl}/users/my-profile`).pipe(
            tap((user) => {
                this.myProfile = user;
                console.log("get image", this.myProfile);
            })
        )
    }

    putMyProfile(userForm: FormGroup): Observable<any> {
        const formData = new FormData;
        for (let key in userForm.value) {
            formData.append(key, userForm.value[key]);
        }
        console.log("user formData", formData);
        
        return this.httpClient
            .put<FormData>(`${environment.apiUrl}/users`, formData)
            .pipe(tap(() => {
                // this.notifyService.success("Your information has been updated", "Success")
            }))
    }
}
