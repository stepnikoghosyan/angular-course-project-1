import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { CommentModel, commentsResponse } from 'src/app/models/comment.model';
import { PostModel } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  
  comments?:CommentModel[]
  constructor(private commentService:PostsService,
              private activatedRoute:ActivatedRoute,
              ) { }

  ngOnInit(): void {
    let id  = this.activatedRoute.snapshot.params['id']      
    this.commentService.getComments(id).subscribe({
      next:(data)=> {
           this.comments = data.results   
           console.log(data.results);        
      }
    })
  }

}
