import { Component, OnInit } from '@angular/core';
import { PostModel } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts : PostModel[]=[]
  constructor(private postService:PostsService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: (data) => {
        console.log(data.results);
      }
    })
  ;
    ;
    
  }

}
