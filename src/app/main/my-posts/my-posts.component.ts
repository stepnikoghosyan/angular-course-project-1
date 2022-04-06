import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { PostsModel } from 'src/app/models/posts.model';
import { NotificationService } from 'src/app/notification-service/notification.service';
import { PostsService } from '../posts/posts.service';
import { UsersService } from '../users/users.service';


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
    const params = {
      userID: this.usersService.currentProfile?.id,
      showAll: true
    }
    this.posts$ = this.postsService.getPosts(params).pipe(
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
