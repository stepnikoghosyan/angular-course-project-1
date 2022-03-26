import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, Observable } from 'rxjs';
import { PostModel } from '../../models/post.model';
import { UserModel } from '../../models/user.model';
import { PostsService } from '../../services/posts.service';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
    myProfile!: UserModel;
    posts$?: Observable<PostModel[]>;
    showSpinner = false;


    constructor(private postService: PostsService,
        private usersService: UsersService,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.showSpinner = true;
        this.posts$ = this.postService.getPosts().pipe(
            finalize(() => {
                this.showSpinner = false;
            }),
            map(data => data.results),
        ),
        this.usersService.getMyProfile().subscribe({
            next: (data) => {
                this.myProfile = data;
                console.log("MY PROFILE DATA", data);
            }
        })
    }
}
