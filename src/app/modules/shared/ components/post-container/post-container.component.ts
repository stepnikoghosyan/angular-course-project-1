import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'src/app/modules/posts/models/post.model';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss']
})
export class PostContainerComponent implements OnInit {
  @Input() title: string = '';
  @Input() posts: PostModel[] | null = null;
  constructor() { }

  ngOnInit(): void {
  }

}
