import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationModel } from '../models/pagination.model';
import { PostDto } from '../models/post.model';
import { PostsModel } from '../models/posts.model';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly  baseUrl:string = environment.Api_Url;
  constructor( 
    private httpClient:HttpClient,
  
    ) { }

  getPosts(): Observable<PaginationModel<PostsModel>>{
    return this.httpClient.get<PaginationModel<PostsModel>>(`${this.baseUrl}posts`)

  }
  
  createPost(obj:PostDto):Observable<PostDto>{
    return  this.httpClient.post<PostDto>(`${this.baseUrl}posts`,obj)
  }
}
