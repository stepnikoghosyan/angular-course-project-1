import {Component, OnInit} from '@angular/core';
import {PostsService} from "../../../post-card/services/posts.service";
import {catchError, finalize, map, Observable, of} from "rxjs";
import {PostModel} from "../../../post-card/models/post.model";
import {NotificationService} from "../../../../services/notification.service";
import {PostsQueryParamsModel} from "../../../post-card/models/posts-query-params.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  isLoading = true;
  posts$?: Observable<PostModel[]>;

  constructor(private postsService: PostsService,
              private notifyService: NotificationService) {
  }

  ngOnInit(): void {
    const params: PostsQueryParamsModel = {
      showAll: true
    }

    this.posts$ = this.postsService.getPosts(params)
      .pipe(
        finalize(() => this.isLoading = false),
        map(data => data.results.splice(-20).reverse()),
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
