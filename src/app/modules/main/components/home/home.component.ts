import { Component, OnInit } from '@angular/core';
import { catchError, finalize, map, Observable, of} from 'rxjs';
import { NotificationService } from 'src/app/shared/notification.service';
import { errorResponse } from 'src/utils/error-response.utility';
import { PostModel } from '../../models/post.model';
import { AuthService } from '../../../auth/services/auth.service';
import { PostsService } from '../../services/posts.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    showSpinner = false
    posts$?: Observable<PostModel[]>

    constructor(
        private postService: PostsService,
        private showNotifications: NotificationService) { }

    ngOnInit(): void {
        this.showSpinner = true
        this.posts$ = this.postService.getPosts().pipe(
            map(data => data.results.slice(-20).reverse()),
            finalize(() => {
                this.showSpinner = false;
            }),
            catchError((err) => {
                this.showNotifications.error(errorResponse(err), "Error");
                return of([]);
            }));
    }
}
