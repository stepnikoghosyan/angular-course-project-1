import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostsModel } from '../models/posts.model';
import { UsersService } from '../users/users.service';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { PostsService } from '../posts/posts.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {
  isLoading = true;
  posts$!: Observable<PostsModel[]>;
  constructor(
    private postsService: PostsService,
    private notifyService: NotificationService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.getMyPosts()
  }

  private getMyPosts() {
      this.posts$ = this.postsService.getPosts(this.usersService.currentProfile?.id).pipe(
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
