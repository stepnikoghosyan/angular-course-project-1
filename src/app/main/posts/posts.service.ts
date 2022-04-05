import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError,  Observable, of, tap } from 'rxjs';
import { PaginationModel } from 'src/app/models/pagination.model';
import { PostDto, PostsModelDto } from 'src/app/models/post.model';
import { PostsModel } from 'src/app/models/posts.model';
import { NotificationService } from 'src/app/notification-service/notification.service';
import { environment } from 'src/environments/environment';


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

  getPosts(userID?: number): Observable<PaginationModel<PostsModel>> {
    const queryParams = this.postsQueryParams(userID)

    return this.httpClient.get<PaginationModel<PostsModel>>(`${this.baseUrl}posts`, {
      params: queryParams
    })

  }

  postsQueryParams (userId?: number) {
    if(userId) {
      return new HttpParams()
      .append('userId', userId)
    }else {
      return new HttpParams()
      .append('showAll', true)
    }
  }

  createPost(obj: PostDto) {
    const formPost = new FormData();
    formPost.append('title', obj.title);
    formPost.append('body', obj.body);
    formPost.append('image', obj.image);

    return this.httpClient.post<PostDto>(`${this.baseUrl}posts`, formPost).pipe(tap(() => {
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
    return this.httpClient.get<PostsModelDto>(`${this.baseUrl}posts/${id}`)
     
  }

  updatePost(id: number, obj: PostDto) {
    return this.httpClient.put(`${this.baseUrl}posts/${id}`, obj)
      .pipe(tap(() => {
        this.router.navigate(['/posts'])
      }))
  }
}

