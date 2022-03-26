import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from 'src/app/modules/main/models/post.model';
import { PostsService } from '../../../services/posts.service';


@Component({
  selector: 'app-posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.scss']
})
export class PostsViewComponent implements OnInit {
post? :PostModel
  constructor( private postService: PostsService,
               private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
        this.postService.getPost(id).subscribe({
            next: (data)=>{
                console.log("POST DATA", data);
                this.post = data;
              if(this.post && !this.post?.imageUrl ){
                this.post.imageUrl = "../../assets/images/img.png"
              }
            }
        })
    
  }

  onImageError():void {
    this.post!.imageUrl = "../../assets/images/img.png"
}

 
}
