import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ResetPassword } from "../models/reset-password.model";

@Injectable()
export class ResetPasswordService {
    constructor(private httpClient: HttpClient) { }

    public resetPassword(body: ResetPassword): Observable<void> {
        return this.httpClient.post<void>(`${environment.apiUrl}/auth/reset-password`, body)
    }
}