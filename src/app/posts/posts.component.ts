import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { PostsModel } from '../models/posts.model';
import { NotificationService } from '../shared/notification.service';
import { UsersService } from '../users/users.service';
import { PostsService } from './posts.service';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {


  isLoading = true;
  posts$!: Observable<PostsModel[]>;
  
  constructor(
    private postsService: PostsService,
    private notifyService: NotificationService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.posts$ = this.postsService.getPosts().pipe(
      finalize(() => {
        this.isLoading = false;
      }),
      map(data => data.results),
      catchError((error: HttpErrorResponse) => {
        this.notifyService.showError(error.error.message, 'Error');
        return of([]);
      }))

  }

}
