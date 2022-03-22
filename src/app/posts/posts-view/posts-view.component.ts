import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';


@Component({
  selector: 'app-posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.scss']
})
export class PostsViewComponent implements OnInit {
posts? :PostModel
  constructor( private postService: PostsService,
               private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
        this.postService.getPost(id).subscribe({
            next: (data)=>{
                console.log("POST DATA", data);
                this.posts = data;
              if(this.posts && !this.posts?.imageUrl ){
                this.posts.imageUrl = "../../assets/images/img.png"
              }
            }
        })
    
  }

}
