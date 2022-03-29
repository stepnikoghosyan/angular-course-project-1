import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, finalize, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { PostsModel } from '../models/posts.model';
import { NotificationService } from '../shared/notification.service';
import { PostsService } from './posts.service';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  unSubscribe$ = new Subject<void>();
  isLoading = true;
  posts$!: Observable<PostsModel[]>;

  constructor(
    private postsService: PostsService,
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.posts$ = this.postsService.getPosts().pipe(
      takeUntil(this.unSubscribe$),
      finalize(() => {
        this.isLoading = false;
      }),
      map(data => data.results),
      catchError((error: HttpErrorResponse) => {
        this.notifyService.showError(error.error.message, 'Error');
        return of([]);
      }))

  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

}
