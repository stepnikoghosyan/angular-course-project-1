import { Component, Input } from '@angular/core';
import { CommentModel } from '../../models/comment.model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent {
  @Input() comment?: CommentModel;
  @Input() userId: number | undefined;
  constructor() { }

}
