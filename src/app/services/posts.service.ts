import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationModel } from '../models/pagination.model';
import { PostDto } from '../models/post.model';
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

  getPosts(): Observable<PaginationModel<PostsModel>> {
    return this.httpClient.get<PaginationModel<PostsModel>>(`${this.baseUrl}posts`)

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
    return this.httpClient.get(`${this.baseUrl}posts/${id}`).pipe(tap(() => {
      this.router.navigate([`post/${id}`])
    }))
  }
}

