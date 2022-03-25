import { Component, Input, OnInit } from '@angular/core';
import { PostsModel } from 'src/app/models/posts.model';
import { PostsService } from 'src/app/posts/posts.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(
   private postsService: PostsService,
  ) { }

  @Input() post!: PostsModel;



  
  ngOnInit(): void {
    
  }


}
