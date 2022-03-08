import { Component, OnInit } from '@angular/core';
import { PostModel } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
    posts : PostModel[]=[];
    showSpinner = false;
    constructor(private postService:PostsService) { }

    ngOnInit(): void {
        this.showSpinner = true;
        this.postService.getPosts().subscribe({
            next: (data) => {
                this.showSpinner = false;
                this.posts = data.results.map((item)=> new PostModel(item));
                console.log(data.results);
                console.log("POSTS", this.posts);
            }
        })
    }

}
