import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserModelDto } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  currentProfile!: UserModelDto | null;

  constructor(private httpClient: HttpClient) {}
  private readonly baseUrl: string = environment.Api_Url;

  userGetProfile() {
    return this.httpClient.get<UserModelDto>(`${this.baseUrl}users/my-profile`)
  }

  getUsers(pageSize:number,page:number){
    return this.httpClient.get(`${this.baseUrl}users?showAll=false&pageSize=${pageSize}&page=${page}`,)
  }
}
