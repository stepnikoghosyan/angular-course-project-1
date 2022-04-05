import {Component, Input} from '@angular/core';
import {PostModel} from "../../models/post.model";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss']
})
export class PostContainerComponent {
  @Input()
  posts$: Observable<PostModel[]> = of([]);

  @Input()
  currentPage: number = 1;

  @Input()
  itemsPerPage: number = 10;

  @Input()
  totalItems: number = 0;

}
