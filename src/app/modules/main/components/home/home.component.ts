import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, map, Observable, tap } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { PostModel } from '../../../../models/post.model';
import { AuthService } from '../../../auth/services/auth.service';
import { PostsService } from '../../services/posts.service';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    myProfile!: UserModel;
    showSpinner = false
    posts$?: Observable<PostModel[]>

    constructor(private router: Router,
        private authService: AuthService,
        private postService: PostsService,
        private usersService: UsersService) { }

    ngOnInit(): void {
        this.showSpinner = true
        this.posts$ = this.postService.getPosts().pipe(
            map(data => data.results.slice(0, 20)),
            finalize(() => {
                this.showSpinner = false
            })
        ),

            this.usersService.getMyProfile().subscribe({
                next: (data) => {
                    this.myProfile = data;
                    console.log("MY PROFILE DATA", data);
                }
            })
    }
    onLogOut() {
        this.authService.logout();
    }

}
