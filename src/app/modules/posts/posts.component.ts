import {Component, OnInit} from '@angular/core';
import {catchError, finalize, map, Observable, of} from "rxjs";

import {PostModel} from "./models/post.model";
import {PostsService} from "./services/posts.service";
import {NotificationService} from "../../services/notification.service";

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
    this.posts$ = this.postsService.getPosts()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
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
