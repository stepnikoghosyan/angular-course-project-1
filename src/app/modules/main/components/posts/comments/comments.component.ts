import { Component, Input, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, Observable, tap } from 'rxjs';
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

  currentUserId?:number
  commentCreaterId?:number
  showSpinner = false

  commentsForm:FormGroup = this.formBuilder.group({
    message : ['',[Validators.required]]
  })

//   comments$? :Observable<CommentModel>[];
  // comments?: CommentModel[];

  comments : any[] = []

  constructor(private commentService:PostsService,
              private activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder,
              private userService : UsersService
              ) {}

  ngOnInit(): void {
    this.currentUserId=this.userService.myProfile?.id
    this.commentCreaterId = this.post?.id
    let id  = this.activatedRoute.snapshot.params['id']      
    // this.comments$ = this.commentService.getComments(id).pipe(
    this.commentService.getComments(id).pipe(
          map(data =>this.comments = data.results),
    ).subscribe()

  }

  createComment(){
    let id  = this.activatedRoute.snapshot.params['id']
    const dto = new createCommentDto(this.commentsForm.value)
    console.log(dto);
      this.commentService.createComment(dto , id).subscribe({
        next : (data) => {
          this.showSpinner = true
          this.commentService.getComments(id).pipe(
            map(data =>this.comments = data.results),
            finalize(()=> {
              this.showSpinner = false
            })
      ).subscribe()  
      }
      
  }
 )}
}