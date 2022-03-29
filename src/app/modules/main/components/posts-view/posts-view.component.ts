import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, finalize, forkJoin, map, Observable, of } from 'rxjs';
import { PaginatedResponseModel } from 'src/app/models/paginated-response.model';
import { PostEntityModel, PostModel } from 'src/app/modules/main/models/post.model';
import { PostsService } from 'src/app/modules/main/services/posts.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CommentModel } from '../../models/comment.model';
import { CommentsQueryParamsModel } from '../../models/comments-query-params.model';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.scss']
})
export class PostsViewComponent implements OnInit {
  private postId: number | null = null;

  isLoading = false;
  post$?: Observable<PostModel>;
  postEntity$?: Observable<PostEntityModel>;
  constructor(private postService: PostsService,
    private activatedRoute: ActivatedRoute,
    private commentsService: CommentsService,
    private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.params['id'];
    this.combineObservable();
  }

  private combineObservable(): void {
    if (this.postId) {
      this.isLoading = true;
      this.postEntity$ = forkJoin([
        this.getPostById(),
        this.getComments()
      ]).pipe(
        finalize(() => { this.isLoading = false; }),
        map(([post, comments]) => {
          return { post, comments };
        }),
        catchError((err: HttpErrorResponse) => {
          this.showNotifications(false, err.error.message);
          return of();
        })
      );
    }
  }

  private getPostById(): Observable<PostModel> {
    return this.postService.getPostById(this.postId!)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.showNotifications(false, err.error.message);
          return of();
        }));

  }
  private getComments(): Observable<CommentModel[]> {
    const params: CommentsQueryParamsModel = {
      showAll: true,
      posts: [this.postId!]
    }
    return this.commentsService.getComments(params)
      .pipe(
        map((data: PaginatedResponseModel<CommentModel>) => { return data.results }),
        catchError((err: HttpErrorResponse) => {
          this.showNotifications(false, err.error.message);
          return of([]);
        })
      );
  }

  private showNotifications(success: boolean, message: string): void {
    if (!success) {
      this.notifyService.showError(message);
    }
  }
}
