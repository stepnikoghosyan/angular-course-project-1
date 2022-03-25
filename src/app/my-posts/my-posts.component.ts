import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostsModel } from '../models/posts.model';
import { NotificationService } from '../services/notification.service';
import { PostsService } from '../services/posts.service';
import { UsersService } from '../users/users.service';
import { catchError, finalize, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {
  isLoading = true;
  posts$!: Observable<PostsModel[]>;
  constructor(
    private postsService: PostsService,
    private notifyService: NotificationService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {

   
    this.getMyPosts()
  }

  private getMyPosts() {
    this.usersService.userGetProfile().subscribe(profile => {
      this.posts$ = this.postsService.getPosts(profile.id).pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        map(data => data.results),
        catchError((error: HttpErrorResponse) => {
          this.notifyService.showError(error.error.message, 'Error');
          return of([]);
        }))
    })
    


  }


}
