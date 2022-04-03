import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
import { createCommentModel } from 'src/app/models/coments.model';
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
  unSubscribe$ = new Subject();
  resetText = false;
  constructor(
    private activeRouter: ActivatedRoute,
    private postsService: PostsService,
    private commentsService: CommentsService
  ) { }

  ngOnInit(): void {
    this.showPost();

  }

  private showPost() {
    this.activeRouter.params.pipe(
      takeUntil(this.unSubscribe$),
      switchMap((par: any) => {
        return this.getPost(par.id)
      })).subscribe()
  }

  getComments(res: createCommentModel) {
    this.resetText = false;
    this.commentsService.addComments(this.postsModel!.id, res)
      .pipe(takeUntil(this.unSubscribe$), switchMap(() => {
        return this.getPost(this.postsModel!.id)
      })).subscribe({
        next:()=>{this.resetText = true}
      })
  }


  private getPost(id: number) {
    return this.postsService.getPostById(id)
    .pipe(takeUntil(this.unSubscribe$),
      map((result: PostsModel) => {
        this.postsModel = result;
      }))
  }
}


