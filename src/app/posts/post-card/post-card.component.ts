import {Component, Input, OnInit} from "@angular/core";
import {PostModel} from "../../models/post.model";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['post-card.component.scss']
})
export class PostCardComponent implements OnInit{
  @Input()
  post: PostModel | null = null;
  defaultImage = 'assets/images/default.jpg';

  get postImage(): string {
    return this.post?.imageUrl ? this.post?.imageUrl : this.defaultImage
  }

  ngOnInit() {
    console.log(this.post);
  }
}
