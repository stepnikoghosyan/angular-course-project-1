import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { PostModel } from 'src/app/modules/main/models/post.model';
import { PostsService } from '../../../services/posts.service';


@Component({
    selector: 'app-posts-view',
    templateUrl: './posts-view.component.html',
    styleUrls: ['./posts-view.component.scss']
})
export class PostsViewComponent implements OnInit {
    showSpinner = false
    post$?:Observable<PostModel>;
    constructor(private postService: PostsService,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.showSpinner=true
        const id = this.activatedRoute.snapshot.params['id'];
        this.post$ = this.postService.getPost(id).pipe(
            finalize(()=>{
                this.showSpinner=false
            }),
        )
    }

    onImageError(): void {
        // this.post$!.imageUrl = "../../assets/images/img.png"
    }
}
