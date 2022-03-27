import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, finalize, Observable, of } from 'rxjs';
import { PostModel } from 'src/app/modules/main/models/post.model';
import { PostsService } from 'src/app/modules/main/services/posts.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.scss']
})
export class PostsViewComponent implements OnInit {
  private postId: number | null = null;

  isLoading = false;
  post$?: Observable<PostModel>;

  constructor(private postService: PostsService,
    private activatedRoute: ActivatedRoute,
    private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.params['id'];
    this.getPostById();
  }

  private getPostById(): void {
    if (this.postId) {
      this.isLoading = true;
      this.post$ = this.postService.getPostById(this.postId)
        .pipe(
          finalize(() => this.isLoading = false),
          catchError((err: HttpErrorResponse) => {
            this.showNotifications(false, err.error.message);
            return of();
          }))
    }
  }

  private showNotifications(success: boolean, message: string): void {
    if (!success) {
      this.notifyService.showError(message);
    }
  }
}
