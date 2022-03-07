import { Component, OnInit } from '@angular/core';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { PostModel } from '../models/post.model';
import { NotificationService } from '../services/notification.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  isloader!: boolean;
  posts$!: Observable<PostModel[]>

  constructor(
    private postsService: PostsService,
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.posts$ = this.postsService.getPosts().pipe(
      finalize(() => {
        this.isloader = false;
      }),
      map(data => data.results),
      catchError((error)=> {
         this.notifyService.showError(error.error.message, 'Error');
         return of([])
      }))
    

  }


    

}
