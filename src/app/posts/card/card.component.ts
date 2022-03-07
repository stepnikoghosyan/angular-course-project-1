import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(
   private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.postsService.getPosts()
    .subscribe((res:any)=>{
      console.log(res);
    })
  }
}
