import { Component, OnInit } from '@angular/core';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { PostModel } from '../models/post.model';
import { NotificationService } from '../services/notification.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {
  isLoading = true;
  myPosts$?: Observable<PostModel[]>;
  constructor(
    private postsService: PostsService,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getMyPosts();
  }

  private getMyPosts(): void {
    this.myPosts$ = this.postsService.getMyPosts().pipe(finalize(() => {
      this.isLoading = false;
    }),
      map(data => data.results),
      catchError((err) => {
        this.showNotifications(false, err.error.message);
        return of([]);
      }))
  }
  private showNotifications(success: boolean, message: string): void {
    if (!success) {
      this.notifyService.showError("Error", message);
    }
  }
}
