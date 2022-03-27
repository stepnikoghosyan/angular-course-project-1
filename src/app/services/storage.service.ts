import {Injectable} from "@angular/core";
import {LoginResponse} from "../modules/auth/models/auth.model";

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  setToken(tokens: LoginResponse, rememberMe: boolean) {
    if (rememberMe) {
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
    } else {
      sessionStorage.setItem('accessToken', tokens.accessToken);
      sessionStorage.setItem('refreshToken', tokens.refreshToken);
    }
  }

  getAccessToken(): string {
    return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || '';
  }

  getRefreshToken(): string {
    return localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken') || '';
  }

  clear() {
    localStorage.clear();
    sessionStorage.clear();
  }

}
