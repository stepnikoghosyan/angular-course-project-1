import { Component, OnInit } from '@angular/core';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { PostsModel } from '../models/posts.model';
import { PostsService } from '../services/posts.service';
import { NotificationService } from '../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // isLoading = false;
  // posts$!: Observable<PostsModel[]>;
  constructor(
    private postsService: PostsService,
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {}
    // this.posts$ = this.postsService.getPosts().pipe(
    //   finalize(() => {
    //     this.isLoading = false;
    //   }),
    //   map(data => data.results),
    //   catchError((error: HttpErrorResponse) => {
    //     this.notifyService.showError(error.error.message, 'Error');
    //     return of([]);
    //   }
}