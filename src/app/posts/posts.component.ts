import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { PostModel } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
    private subscription! :Subscription
    posts : PostModel[]=[];
    showSpinner = false;
    constructor(private postService:PostsService) { }

    ngOnInit(): void {
        this.showSpinner = true;
      this.subscription=  this.postService.getPosts().pipe(
            finalize(()=>{
            this.showSpinner = false;
            })
        ).subscribe({
            next: (data) => {          
                this.posts = data.results.map((item)=> new PostModel(item));
            }
        })
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe()
        }
    }
}
