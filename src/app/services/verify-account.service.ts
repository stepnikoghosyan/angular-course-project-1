import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class VerifyAccountService {
  constructor(private httpClient: HttpClient) {
  }

  verifyAccount(token: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}auth/verify-account?activationToken=${token}`);
  }

  resendActivationToken(email: string): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}auth/resend-activation-token`,
      {
        email: email
      });
  }
}
