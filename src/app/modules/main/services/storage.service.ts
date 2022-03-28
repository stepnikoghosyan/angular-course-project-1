import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  getAccessToken(): string {
    return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || '';
  }
}
