import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { PostModel } from "../../models/post.model";

@Component({
  selector: 'app-post-card-footer',
  templateUrl: './post-card-footer.component.html',
  styleUrls: ['post-card-footer.component.scss']
})
export class PostCardFooterComponent {
  @Input() post: PostModel | null = null;
  @Input() canEdit: boolean = false;
  constructor(private route: Router) { }

  editPost(): void {
    this.route.navigate([`/posts/${this.post?.id}`]);
  }

  viewPost(): void {
    this.route.navigate([`/posts/view/${this.post?.id}`]);
  }

}
