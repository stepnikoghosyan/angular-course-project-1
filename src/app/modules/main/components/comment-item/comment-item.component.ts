import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CommentModel } from '../../models/comment.model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {
  @Input() comment?: CommentModel;
  userId: number | undefined;
  constructor(private userService: UserService) {
    this.userId = this.userService.getUser()?.id;
  }

  ngOnInit(): void {
  }

}
