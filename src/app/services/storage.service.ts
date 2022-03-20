import {Injectable} from "@angular/core";
import {LoginResponse} from "../modules/auth/models/auth.model";

type StorageType = 'localStorage' | 'sessionStorage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageType: StorageType = 'sessionStorage';

  setStorageType(storageType: StorageType) {
    this.storageType = storageType
  }

  setToken(tokens: LoginResponse) {
    this.storage.setItem('accessToken', tokens.accessToken);
    this.storage.setItem('refreshToken', tokens.refreshToken);
  }

  getAccessToken(): string {
    return this.storage.getItem('accessToken') || '';
  }

  getRefreshToken(): string {
    return this.storage.getItem('refreshToken') || '';
  }

  private get storage() {
    return this.storageType === 'localStorage' ? localStorage : sessionStorage;
  }

  clear() {
    this.storage.clear();
  }

}
