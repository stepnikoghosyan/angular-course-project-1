import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { PostModel } from 'src/app/modules/main/models/post.model';
import { UserModel } from '../../../models/user.model';
import { PostsService } from '../../../services/posts.service';
import { UsersService } from '../../../services/users.service';

@Component({
    selector: 'app-card-footer',
    templateUrl: './card-footer.component.html',
    styleUrls: ['./card-footer.component.scss']
})
export class CardFooterComponent implements OnInit {
    @Input('post') post?: PostModel;
    isMyPost = false;

    constructor(private authService: AuthService,
                private myProfile : UsersService) { }

    ngOnInit(): void {
        console.log("MY ID, USER ID", this.myProfile.myProfile?.id, );
        if(this.post?.user.id === this.authService.myProfileId){
            console.log("profile id", this.authService.myProfileId);
            
            this.isMyPost = true;
        }else{
            // console.log("profile id", this.authService.myProfileId);
            
            this.isMyPost;
        }
    }
}