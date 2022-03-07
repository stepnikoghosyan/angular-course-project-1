import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly  baseUrl:string = environment.Api_Url;
  constructor( private httpClient:HttpClient,) { }

  getPosts(){
    return this.httpClient.get(`${this.baseUrl}posts`)

  }
}
