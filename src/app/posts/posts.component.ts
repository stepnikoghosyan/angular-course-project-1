import { Component, OnInit } from '@angular/core';
import {PostModel} from "../models/post.model";
import {PostsService} from "../services/posts.service";
import {finalize, Subject, takeUntil} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  showSpinner = true;
  posts: PostModel[] = [];
  constructor(private postsService: PostsService,
              private notifyService: NotificationService,
              private router: Router) { }

  ngOnInit(): void {
   this.postsService.getPosts()
     .pipe(takeUntil(this.unsubscribe$),
     finalize(() => {
       this.showSpinner = false;
     }))
     .subscribe({
       error: (err: HttpErrorResponse) => {
         this.showNotifications(false, err.error.message)
       },
       next: (data) => {
         this.posts = data.results;
       },
       complete: () => {
         this.showSpinner = false;
       }
     })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private showNotifications(success: boolean, message: string): void {
    if (!success) {
      this.notifyService.showError("Error", message);
    }
  }

}
