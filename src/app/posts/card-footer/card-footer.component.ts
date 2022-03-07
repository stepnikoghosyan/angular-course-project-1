import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from 'src/app/models/post.model';

@Component({
  selector: 'app-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.scss']
})
export class CardFooterComponent implements OnInit {

  constructor() { }

 @Input() post!: PostModel;

  ngOnInit(): void {
  }

}
