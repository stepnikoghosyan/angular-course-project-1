import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, finalize, forkJoin, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { PaginatedResponseModel } from 'src/app/models/paginated-response.model';
import { PostEntityModel, PostModel } from 'src/app/modules/main/models/post.model';
import { PostsService } from 'src/app/modules/main/services/posts.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { CommentDto, CommentModel } from '../../models/comment.model';
import { CommentsQueryParamsModel } from '../../models/comments-query-params.model';
import { UserModel } from '../../models/user.model';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.scss']
})
export class PostsViewComponent implements OnInit, OnDestroy {
  private postId: number | null = null;
  private usubscribe$ = new Subject<void>();
  private newCommentSubject = new BehaviorSubject<CommentModel | null>(null);

  isLoading = false;
  user: UserModel | null;
  postEntity$?: Observable<PostEntityModel>;
  constructor(private postService: PostsService,
    private activatedRoute: ActivatedRoute,
    private commentsService: CommentsService,
    private userService: UserService,
    private notifyService: NotificationService) {
    this.user = this.userService.getUser();
    this.postId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.combineObservable();
  }

  private combineObservable(): void {
    if (this.postId) {
      this.isLoading = true;
      this.postEntity$ = combineLatest([
        this.getPostById(),
        this.getComments(),
        this.newCommentSubject.asObservable()
      ]).pipe(
        map(([post, comments, newComment]) => {
          if (newComment && newComment.id) {
            newComment = Object.assign(newComment, { user: this.user });
            comments.unshift(newComment);
          }
          this.isLoading = false;
          return { post, comments };
        }),
        catchError((err: HttpErrorResponse) => {
          this.isLoading = false;
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

  sendComment(message: string): void {
    this.isLoading = true;
    const commentDto = new CommentDto(message);
    this.commentsService.addComment(this.postId!, commentDto).pipe(
      takeUntil(this.usubscribe$),
      finalize(() => { this.isLoading = false; })).subscribe({
        next: (comment: CommentModel) => {
          this.newCommentSubject.next(comment);
        },
        error: (err: HttpErrorResponse) => {
          this.showNotifications(false, err.error.message);
        }
      });
  }

  private showNotifications(success: boolean, message: string): void {
    if (!success) {
      this.notifyService.showError(message);
    }
  }
  ngOnDestroy(): void {
    this.usubscribe$.complete();
    this.usubscribe$.next();
  }
}
