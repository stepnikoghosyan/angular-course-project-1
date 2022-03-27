import {Component, OnInit} from '@angular/core';
import {catchError, finalize, map, Observable, of} from "rxjs";

import {PostModel} from "../../models/post.model";
import {PostsService} from "../../services/posts.service";
import {NotificationService} from "../../../../services/notification.service";
import {PostsQueryParamsModel} from "../../models/posts-query-params.model";

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
          this.notifyService.showError(err.error.message);
          return of([]);
        }));
  }
}
