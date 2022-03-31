import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'src/app/modules/main/models/post.model';
import { UserModel } from 'src/app/modules/main/models/user.model';

@Component({
    selector: 'app-post-card',
    templateUrl: './post-card.component.html',
    styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
    @Input('post') post!: PostModel;

    constructor() { }

    ngOnInit(): void { }

    onImageError(): void {
        this.post.imageUrl = "../../assets/images/img.png"
    }
}
