import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { UserModel } from 'src/app/modules/main/models/user.model';
import { NotificationService } from 'src/app/services/notification.service';
import { errorResponse } from 'src/utils/error-response.utility';
import { PostModel } from '../../models/post.model';
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
        private usersService: UsersService,
        private showNotifications :NotificationService) { }

    ngOnInit(): void {
        this.showSpinner = true
        this.posts$ = this.postService.getPosts().pipe(
            map(data => data.results.slice(-20).reverse()),
            finalize(() => {
                this.showSpinner = false
            }),
            catchError((err) => {
                this.showNotifications.error(errorResponse(err),"Error" );
                return of([]);
            }));

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
