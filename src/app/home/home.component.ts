import { Component, OnInit } from '@angular/core';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { PostsModel } from '../models/posts.model';
import { HttpErrorResponse } from '@angular/common/http';
import { PostsService } from '../posts/posts.service';
import { NotificationService } from '../shared/notification.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading = true;
  posts$!: Observable<PostsModel[]>;
  constructor(
    private postsService: PostsService,
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.posts$ = this.postsService.getPosts().pipe(
      finalize(() => {
        this.isLoading = false;
      }),
      map(data => data.results.slice(-20)),
      catchError((error: HttpErrorResponse) => {
        this.notifyService.showError(error.error.message, 'Error');
        return of([]);
      }));

  }

}