import {Component, OnInit} from '@angular/core';
import {catchError, finalize, map, Observable, of} from "rxjs";

import {PostModel} from "../post-card/models/post.model";
import {PostsService} from "../post-card/services/posts.service";
import {NotificationService} from "../../services/notification.service";
import {PostsQueryParamsModel} from "../post-card/models/posts-query-params.model";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  isLoading = true;
  posts$?: Observable<PostModel[]>;

  constructor(private postsService: PostsService,
              private notifyService: NotificationService) {
  }

  ngOnInit(): void {
    const params: PostsQueryParamsModel = {
      showAll: true,
    }
    this.posts$ = this.postsService.getPosts(params)
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
      this.notifyService.showError("Error", message);
    }
  }
}
