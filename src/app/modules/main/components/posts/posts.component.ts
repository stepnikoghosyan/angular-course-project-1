import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { PostModel } from '../../models/post.model';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
    posts$? :Observable< PostModel[]>
    showSpinner = false;
    constructor(private postService:PostsService) { }

    ngOnInit(): void {
        this.showSpinner = true;
        this.posts$ =  this.postService.getPosts().pipe(
            finalize(()=>{
                this.showSpinner = false;
            }),
            map(data=>data.results),
        )
    }
}
