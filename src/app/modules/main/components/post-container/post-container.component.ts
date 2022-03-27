import {Component, Input} from '@angular/core';
import {PostModel} from "../../models/post.model";

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss']
})
export class PostContainerComponent {
  @Input()
  title: string = '';

  @Input()
  subTitle: string = '';

  @Input()
  posts: PostModel[] | null = null;

}
