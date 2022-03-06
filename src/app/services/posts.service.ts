import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationResponseModel } from '../models/pagination-response';
import { PostModel } from '../models/post.model';
import { tap,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

    constructor(private httpClient: HttpClient) { };


    getPosts() : Observable <PaginationResponseModel<PostModel>>  {
      return this.httpClient.get<PaginationResponseModel<PostModel>>
      (`${environment.apiUrl}/posts`)
      .pipe(map(data => {
        return data;
      }));
  }
}
