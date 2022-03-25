import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationModel } from '../models/pagination.model';
import { PostDto, PostsModelDto } from '../models/post.model';
import { PostsModel } from '../models/posts.model';
import { NotificationService } from './notification.service';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly baseUrl: string = environment.Api_Url;
  constructor(
    private httpClient: HttpClient,
    private notifyService: NotificationService,
    private router: Router
  ) { }
  infoPost!: object

  getPosts(userID?: number): Observable<PaginationModel<PostsModel>> {
    let params: any = {
      showAll: true
    }

    if (userID) {
      params.userID = userID.toString();
    }

    return this.httpClient.get<PaginationModel<PostsModel>>(`${this.baseUrl}posts`,{
      params
    })

  }

  createPost(obj: PostDto) {
    return this.httpClient.post<PostDto>(`${this.baseUrl}posts`, obj).pipe(tap(() => {
      this.notifyService.showSuccess('Your post was successfully published', 'success');
      this.router.navigate(['/posts']);
    }),
      catchError((error: HttpErrorResponse) => {
        this.notifyService.showError(error.error.message, 'Error');
        return of([]);
      })
    );
  }

  getPostById(id: number) {
    return this.httpClient.get<PostsModelDto>(`${this.baseUrl}posts/${id}`).pipe(tap((res) => {
      this.infoPost = res;
      console.log(res); 
      console.log('post-view');
      
    }))
  }
  
  updatePost(id: number, obj: PostDto) {
    return this.httpClient.put(`${this.baseUrl}posts/${id}`, obj)
    .pipe(tap(()=>{
      this.router.navigate(['/posts'])
    }))
  }
}

