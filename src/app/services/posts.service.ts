import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationResponseModel } from '../models/pagination-response';
import { PostModel, PostModelDto } from '../models/post.model';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

    constructor(private httpClient: HttpClient,
                private router: Router,
                private notifyService: NotificationService) { };


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
            .put<PostModel>(`${environment.apiUrl}/posts/${id}`, postDto)
                .pipe(
                    tap(()=>{
                        this.notifyService.success("Post is updated", "Success!!")
                        this.router.navigateByUrl('/main/posts');
                    }), 
                    //catchError(()=>)
                    
                ) 
    }

    createPost(postDto: PostModelDto): Observable<any>{
        console.log(postDto)
        return this.httpClient.post<PostModel>(`${environment.apiUrl}/posts/`, postDto)
    }

}