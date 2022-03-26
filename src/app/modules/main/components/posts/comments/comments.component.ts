import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { CommentModel } from 'src/app/modules/main/models/comment.model';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  commentsForm:FormGroup = this.formBuilder.group({
    message : ['']
  })
  comments?:CommentModel[]
  constructor(private commentService:PostsService,
              private activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder
              ) { }

  ngOnInit(): void {
    // let id  = this.activatedRoute.snapshot.params['id']      
    // this.commentService.getComments(id).subscribe({
    //   next:(data)=> {
    //        this.comments = data.results   
    //       //  console.log(data.results);        
    //   }
    // })
  }

  createComment(){
    // let id  = this.activatedRoute.snapshot.params['id']
    // const dto = new createComment(this.commentsForm.value)
    // console.log(dto);
    //   this.commentService.createComment(dto , id).subscribe({
    //     // next :(data) => {
    //     //   console.log(this.commentsForm.value); 
    //     // }
    //   })
  }

}
