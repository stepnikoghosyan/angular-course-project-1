import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationResponseModel } from '../models/pagination-response';
import { PostModel, PostModelDto } from '../models/post.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

    constructor(private httpClient: HttpClient) { };


    getPosts() : Observable <PaginationResponseModel<PostModel>>  {
    
      return this.httpClient
        .get<PaginationResponseModel<PostModel>>(`${environment.apiUrl}/posts`);
           
    }

    getPost(id: number): Observable <PostModel>{
        return this.httpClient
            .get<PostModel>(`${environment.apiUrl}/posts/${id}`)
    }

    putPost(id: number, postDto: PostModelDto): Observable<any>{
        return this.httpClient
            .put<PostModel>(`${environment.apiUrl}/posts/${id}`, postDto);
    }
}