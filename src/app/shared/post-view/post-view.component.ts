import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { PostsModel } from 'src/app/models/posts.model';
import { PostsService } from 'src/app/posts/posts.service';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
  faPaperPlane=faPaperPlane;
  postsModel?:PostsModel = {} as PostsModel;

  constructor(
    private activeRouter: ActivatedRoute,
    private postsService: PostsService,
  ) { }

  ngOnInit(): void {
    this.showPost();
  }

  private showPost() {
    this.activeRouter.params.pipe(switchMap((par: any) => {
      return this.postsService.getPostById(+par.id)
    })).subscribe((result: PostsModel) => {
      this.postsModel = result;
    })
  }

}
