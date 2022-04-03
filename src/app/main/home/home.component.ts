import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, finalize, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { PostsModel } from '../../models/posts.model';
import { HttpErrorResponse } from '@angular/common/http';

import { NotificationService } from '../../notification-service/notification.service';
import { PostsService } from '../posts/posts.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
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
      map(data => data.results.slice(-20)),
      catchError((error: HttpErrorResponse) => {
        this.notifyService.showError(error.error.message, 'Error');
        return of([]);
      }));

  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}