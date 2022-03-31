import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { CommentModel } from 'src/app/models/comment.model';
import { PostModel } from 'src/app/models/post.model';
import { commentsResponse } from '../../../models/post.model';
import { createCommentDto } from '../../../models/post.model';
import { UserModel } from '../../../models/user.model';
import { PostsService } from '../../../services/posts.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input('myProfile') myProfile!: UserModel;
  @Input('post') post?: PostModel;

  commentsForm:FormGroup = this.formBuilder.group({
    message : ['']
  })
//   comments$? :Observable<CommentModel>[];
  comments?: CommentModel[];
  constructor(private commentService:PostsService,
              private activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder,
              private userService : UsersService
              ) {}

  ngOnInit(): void {

    let id  = this.activatedRoute.snapshot.params['id']      
    // this.comments$ = this.commentService.getComments(id).pipe(
     this.commentService.getComments(id).pipe(
          map(data => data.results),
          tap((data)=> {
            console.log(data);   
          })
    ).subscribe({
        next:(data)=>{
            
        }
    })
 
  }

  createComment(){
    let id  = this.activatedRoute.snapshot.params['id']
    const dto = new createCommentDto(this.commentsForm.value)
    console.log(dto);
      this.commentService.createComment(dto , id).subscribe({
        // next :(data) => {
        //   console.log(this.commentsForm.value); 
        // }
      })
  }
}