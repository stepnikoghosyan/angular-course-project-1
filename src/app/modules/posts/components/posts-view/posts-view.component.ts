import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { PostModel } from 'src/app/modules/post-card/models/post.model';
import { PostsService } from 'src/app/modules/post-card/services/posts.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.scss']
})
export class PostsViewComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  private postId: number | null = null;
  isLoading = false;
  post?: PostModel;

  constructor(private postService: PostsService,
    private activatedRoute: ActivatedRoute,
    private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.getParams();
  }

  private getParams(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        this.postId = +params['id'];
        if (this.postId) {
          this.getPostById();
        }
      });
  }

  private getPostById(): void {
    if (this.postId) {
      this.isLoading = true;
      this.postService.getPostById(this.postId).pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => {
          this.isLoading = false;
        }))
        .subscribe({
          next: (data: PostModel) => {
            this.post = data;
            console.log('dataModel', this.post)
          },
          error: (err: HttpErrorResponse) => {
            this.notifyService.showNotification(false, err.error.message);
          }
        })
    }
  }

}
