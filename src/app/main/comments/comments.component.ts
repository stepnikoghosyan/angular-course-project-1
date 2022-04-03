import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostsModel } from '../../models/posts.model';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { createCommentModel } from '../../models/coments.model';
import { PostsService } from '../posts/posts.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  faPaperPlane = faPaperPlane;
  unSubscribe$ = new Subject();
  text = new FormControl('');

  @Input() postsModel?: PostsModel = {} as PostsModel;
  @Input()
  set resetText(reset: boolean) {
    if (reset) {
      this.text.reset()

    }
  }

  @Output() userComments = new EventEmitter<createCommentModel>();
  constructor(
    private postsService: PostsService,
  ) { }

  ngOnInit(): void { }


  getPost() {
    this.postsService.getPostById(this.postsModel!.id)
      .subscribe()
  }

  addComments() {
    const obj: createCommentModel = {
      message: this.text.value
    }
    this.userComments?.emit(obj);
  }

}
