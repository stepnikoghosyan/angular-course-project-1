import { Component, Input } from "@angular/core";
import { IPost } from "../models/post.model";

@Component({
    selector: 'app-post-card',
    templateUrl: './post-card.component.html',
    styleUrls: ['post-card.component.scss']
})
export class PostCardComponent {
    @Input() post!: IPost;
    defaultImage = 'assets/images/default.jpg';

    constructor() { }

    get postImage(): string {
        return this.post?.imageUrl ? this.post?.imageUrl : this.defaultImage
    }
}