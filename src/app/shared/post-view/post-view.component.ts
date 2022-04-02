import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { PostsModel } from 'src/app/models/posts.model';
import { PostsService } from 'src/app/posts/posts.service';
import { CommentsService } from './comments.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {

  postsModel?: PostsModel = {} as PostsModel;

  constructor(
    private activeRouter: ActivatedRoute,
    private postsService: PostsService,
    private commentsService: CommentsService
  ) { }

  ngOnInit(): void {
    this.showPost();

  }

  private showPost() {
    this.activeRouter.params.pipe(switchMap((par: any) => {
      return forkJoin([this.postsService.getPostById(par.id), this.commentsService.getComments(par.id)])
    }))
      .subscribe((result) => {
        this.postsModel = result[0];
        console.log('result =', result)
      })

  }
}
