import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModelDto } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  currentProfile!: UserModelDto | null;

  constructor(private httpClient: HttpClient) { }
  private readonly baseUrl: string = environment.Api_Url;

  userGetProfile() {
    return this.httpClient.get<UserModelDto>(`${this.baseUrl}users/my-profile`)
  }

  userQueryParams(pageSize: number, page: number, search: string) {
    if(search != ''){
      return new HttpParams()
      .append('search', search)
      .append('showAll', true);
    }else{
      return new HttpParams()
      .append('showAll', false)
      .append('pageSize', pageSize)
      .append('page', page);
    }
   
  }

  getUsers(pageSize: number, page: number, search: string) {
    const queryParams = this.userQueryParams(pageSize, page, search);

    return this.httpClient.get(`${this.baseUrl}users`, {
      params: queryParams
    })
  }

  putUsers(body:UserModelDto){
    return this.httpClient.put(`${this.baseUrl}users`,body)
  }
  
  getAllUsers() {
    return this.httpClient.get(`${this.baseUrl}users`)
  }


}
