import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from 'src/app/models/post.model';
import { faEye, faComment, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.scss']
})
export class CardFooterComponent implements OnInit {
  faEye = faEye;
  faEdit = faEdit;
  faComment = faComment;
  constructor() { }

  @Input() post!: PostModel;

  ngOnInit(): void {
  }

}
