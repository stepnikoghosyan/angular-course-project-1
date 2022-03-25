import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from 'src/app/models/post.model';
import { UserModel } from '../../../../../models/user.model';
import { PostsService } from '../../../services/posts.service';
import { UsersService } from '../../../services/users.service';

@Component({
    selector: 'app-card-footer',
    templateUrl: './card-footer.component.html',
    styleUrls: ['./card-footer.component.scss']
})
export class CardFooterComponent implements OnInit {
    @Input('post') post!: PostModel;
    @Input('myProfile') myProfile!: UserModel;
    isMyPost = false;

    constructor() { }

    ngOnInit(): void {
        console.log("MY ID", this.myProfile);
        this.post.user.id === this.myProfile.id ? this.isMyPost = true : this.isMyPost
    }
}
