import {Component, Input} from "@angular/core";
import {PostModel} from "../../models/post.model";

@Component({
  selector: 'app-post-card-footer',
  templateUrl: './post-card-footer.component.html',
  styleUrls: ['post-card-footer.component.scss']
})
export class PostCardFooterComponent {
  @Input() post: PostModel | null = null;

}
