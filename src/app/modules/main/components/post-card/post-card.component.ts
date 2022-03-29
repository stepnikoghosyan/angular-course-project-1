import { Component, Input } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { PostModel } from "../../models/post.model";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['post-card.component.scss']
})
export class PostCardComponent {
  @Input()
  post: PostModel | null = null;
  userId: number | undefined;
  constructor(private userService: UserService) {
    this.userId = this.userService.getUser()?.id;
  }
}
