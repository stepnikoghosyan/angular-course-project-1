import { Component, Input, OnInit } from '@angular/core';
import { PostsModel } from '../models/posts.model';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { CommentsService } from '../shared/post-view/comments.service';
import { FormControl } from '@angular/forms';
import { debounceTime, Subject, switchMap, takeUntil } from 'rxjs';
import { createCommentModel } from '../models/coments.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  faPaperPlane = faPaperPlane;
  unSubscribe$ = new Subject()
  text = new FormControl('');
  @Input() postsModel?: PostsModel = {} as PostsModel;
  constructor(
    private commentsService: CommentsService
  ) { }


  ngOnInit(): void { }

  addComments() {
    const obj: createCommentModel = {
      message: this.text.value
    }

    this.commentsService.addComments(this.postsModel!.id, obj)
      .pipe(takeUntil(this.unSubscribe$)).subscribe({
        next: (res) => {
          console.log('res =',res)
        }
      })

  }

}
