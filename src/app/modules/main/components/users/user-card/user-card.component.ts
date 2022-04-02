import { Component, Input, OnInit } from '@angular/core';
import { GetUserModel } from '../../../models/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input('user') user?: GetUserModel;
  constructor() { }

  ngOnInit(): void {
  }
  onImageError(): void {
    this.user!.profilePictureUrl = "../../assets/images/user_image_for_comment.webp";
}
}
