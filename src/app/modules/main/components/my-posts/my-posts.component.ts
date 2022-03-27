import {Component, OnInit} from '@angular/core';
import {catchError, finalize, map, Observable, of} from 'rxjs';
import {PostModel} from '../../models/post.model';
import {NotificationService} from '../../../../services/notification.service';
import {PostsService} from '../../services/posts.service';
import {UserService} from 'src/app/services/user.service';
import {PostsQueryParamsModel} from '../../models/posts-query-params.model';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {
  isLoading = true;
  myPosts$: Observable<PostModel[]> = of([]);

  constructor(
    private postsService: PostsService,
    private userService: UserService,
    private notifyService: NotificationService) {
  }

  ngOnInit(): void {
    this.getMyPosts();
  }

  private getMyPosts(): void {
    const params:PostsQueryParamsModel = {
      page: 1,
      pageSize: 10,
      userID: this.userService.user?.id
    }
    this.myPosts$ = this.postsService.getPostsByPagination(params)
      .pipe(
        finalize(() => this.isLoading = false),
        map(data => data.results),
        catchError((err) => {
          this.showNotifications(false, err.error.message);
          return of([]);
        }));
  }

  private showNotifications(success: boolean, message: string): void {
    if (!success) {
      this.notifyService.showError(message);
    }
  }
}
