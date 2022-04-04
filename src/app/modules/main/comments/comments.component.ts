import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, EMPTY, finalize, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { PaginatedResponseModel } from 'src/app/models/paginated-response.model';
import { NotificationService } from 'src/app/services/notification.service';
import { CommentDto, CommentModel } from '../models/comment.model';
import { CommentsQueryParamsModel } from '../models/comments-query-params.model';
import { UserModel } from '../models/user.model';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() postId: number | null = null;
  @Input() user: UserModel | null = null;

  isLoading = false;
  comments$: Observable<CommentModel[]> = of([]);

  private unsubscribe$ = new Subject<void>();
  private newCommentSubject = new BehaviorSubject<CommentModel | null>(null);

  constructor(
    private commentsService: CommentsService,
    private notifyService: NotificationService) { }

  ngOnInit(): void {
    if (this.postId) {
      this.combineObservable();
    }
  }
  private combineObservable(): void {
    this.isLoading = true;
    this.comments$ = combineLatest([
      this.getComments(),
      this.newCommentSubject.asObservable()
    ]).pipe(
      map(([comments, newComment]) => {
        if (newComment && newComment.id) {
          comments.unshift(newComment);
        }
        this.isLoading = false;
        return comments;
      }),
      catchError((err: HttpErrorResponse) => {
        this.isLoading = false;
        this.showNotifications(false, err.error.message);
        return EMPTY;
      })
    );
  }

  private getComments(): Observable<CommentModel[]> {
    const params: CommentsQueryParamsModel = {
      showAll: true,
      posts: [this.postId!]
    };
    return this.commentsService.getComments(params)
      .pipe(
        map((data: PaginatedResponseModel<CommentModel>) => data.results),
        catchError((err: HttpErrorResponse) => {
          this.showNotifications(false, err.error.message);
          return of([]);
        })
      );
  }

  sendComment(message: string): void {
    this.isLoading = true;
    const commentDto = new CommentDto(message);
    this.commentsService.addComment(this.postId!, commentDto)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => {
          this.isLoading = false;
        }))
      .subscribe({
        next: (comment: CommentModel) => {
          comment = Object.assign(comment, { user: this.user });
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
    this.unsubscribe$.complete();
    this.unsubscribe$.next();
  }
}
