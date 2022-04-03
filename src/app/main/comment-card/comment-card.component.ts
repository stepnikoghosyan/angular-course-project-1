import { Component, Input, OnInit } from '@angular/core';
import { CommentsModel } from '../../models/coments.model';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {

  @Input()userComment?:CommentsModel

  constructor() { }

  ngOnInit(): void {}

}
