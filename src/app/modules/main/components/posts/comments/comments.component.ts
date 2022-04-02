import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, Subject, takeUntil } from 'rxjs';
import { PostModel } from 'src/app/models/post.model';
import { createCommentDto } from '../../../models/post.model';
import { GetUserModel } from '../../../models/user.model';
import { PostsService } from '../../../services/posts.service';
import { UsersService } from '../../../services/users.service';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {
    @Input('post') post?: any;

    firstSubscription = new Subject<void>()
    secondSubscription = new Subject<void>()
    thirdSubscription = new Subject<void>();
    myProfileInfo?: GetUserModel;
    currentUserId?: number;
    commentCreaterId?: number;
    showSpinner = false;
    isMyComment = false;

    commentsForm: FormGroup = this.formBuilder.group({
        message: ['', [Validators.required]]
    });

    comments: any[] = []

    constructor(private commentService: PostsService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private userService: UsersService
    ) { }

    ngOnInit(): void {
        this.myProfileInfo = this.userService.myProfile;
        console.log("comment my profile", this.myProfileInfo?.profilePictureUrl);
        
        let id = this.activatedRoute.snapshot.params['id']
        this.commentService.getComments(id).pipe(
            takeUntil(this.firstSubscription),
            map(data => {
                this.comments = data.results
            }))
            .subscribe({
                next: () => {
                    console.log("hii");
                }
            })
    }

    onImageError() {
        this.myProfileInfo!.profilePictureUrl = "../../assets/images/user_image.jpg";

    }
    onCommentImageError() {
        this.myProfileInfo!.profilePictureUrl = "../../assets/images/user_image_for_comment.webp"
    }

    createComment() {
        let id = this.activatedRoute.snapshot.params['id']
        const dto = new createCommentDto(this.commentsForm.value)
        console.log(dto);
        this.commentService.createComment(dto, id).pipe(
            takeUntil(this.secondSubscription)
        ).subscribe({
            next: (data) => {
                this.showSpinner = true
                this.commentService.getComments(id).pipe(
                    map(data => this.comments = data.results),
                    finalize(() => {
                        this.showSpinner = false
                    })
                ).pipe(
                    takeUntil(this.thirdSubscription)
                ).subscribe()
            }
        }
        )
    }
    ngOnDestroy(): void {
        this.firstSubscription.next()
        this.firstSubscription.complete()
        this.secondSubscription.next()
        this.secondSubscription.complete()
        this.thirdSubscription.next()
        this.thirdSubscription.complete()
    }
}