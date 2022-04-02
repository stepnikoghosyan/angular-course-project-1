import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';
import { PaginationResponseModel } from '../models/pagination-response';
import { GetUserModel } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    public myProfile?: GetUserModel
    searchResult$?: Observable<any>;

    constructor(
        private httpClient: HttpClient
    ) { }

    getMyProfile(): Observable<GetUserModel> {
        return this.httpClient.get<GetUserModel>(`${environment.apiUrl}/users/my-profile`).pipe(
            tap((user) => {
                this.myProfile = user;
                console.log("get image", this.myProfile);
            })
        )
    };

    putMyProfileInfo(userForm: FormGroup): Observable<any> {
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

    getUsers(value?: string): Observable<PaginationResponseModel<GetUserModel>> {
        let params = {}
        if (value) {
            params = {
                'search': value!
            }
        }
        return this.httpClient.get<PaginationResponseModel<GetUserModel>>(`${environment.apiUrl}/users`, { params }).pipe(
            tap(() => {
                console.log(params);
             })
        )
    }

}
