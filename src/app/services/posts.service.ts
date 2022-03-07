import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationModel } from '../models/pagination.model';
import { PostModel } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly  baseUrl:string = environment.Api_Url;
  constructor( private httpClient:HttpClient,) { }

  getPosts(): Observable<PaginationModel<PostModel>>{
    return this.httpClient.get<PaginationModel<PostModel>>(`${this.baseUrl}posts`)

  }
}
