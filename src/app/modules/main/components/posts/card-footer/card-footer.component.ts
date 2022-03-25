import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from 'src/app/modules/main/models/post.model';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.scss']
})
export class CardFooterComponent implements OnInit {
    @Input('post') post!: PostModel;

    constructor(private postService: PostsService,
                private router: Router
                ) { }

    ngOnInit(): void {}

    // getPost(id: number){
    //     if(this.post){
    //         this.postService.getPost(id).subscribe({
    //             next: (data) => {    
    //                 this.router.navigateByUrl(`/main/edit-post/${id}`);
    //                 console.log("GET POTS'S DATA", data);
    //             }
    //         });
    //     }
    // }
}
