import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  catchError,
  EMPTY,
  finalize,
  Observable
} from 'rxjs';

import { PostModel } from 'src/app/modules/main/models/post.model';
import { PostsService } from 'src/app/modules/main/services/posts.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.scss']
})
export class PostsViewComponent implements OnInit {
  readonly postId: number;

  isLoading = true;
  user: UserModel | null;
  post$?: Observable<PostModel>;

  constructor(private postService: PostsService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private notifyService: NotificationService) {
    this.user = this.userService.getUser();
    this.postId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getPostById();
  }

  private getPostById(): void {
    this.post$ = this.postService.getPostById(this.postId)
      .pipe(
        finalize(() => { this.isLoading = false }),
        catchError((err: HttpErrorResponse) => {
          this.showNotifications(false, err.error.message);
          return EMPTY;
        }));
  }

  private showNotifications(success: boolean, message: string): void {
    if (!success) {
      this.notifyService.showError(message);
    }
  }
}
