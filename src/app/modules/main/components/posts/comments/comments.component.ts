import { Component, Input, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, Observable, tap } from 'rxjs';
import { CommentModel } from 'src/app/models/comment.model';
import { PostModel } from 'src/app/models/post.model';
import { commentsResponse } from '../../../models/post.model';
import { createCommentDto } from '../../../models/post.model';
import { GetUserModel, UserModel } from '../../../models/user.model';
import { PostsService } from '../../../services/posts.service';
import { UsersService } from '../../../services/users.service';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
    @Input('myProfile') myProfile!: GetUserModel;
    @Input('post') post!: any; //?????????????????????????/

    myProfileInfo?: GetUserModel;
    currentUserId?: number;
    commentCreaterId?: number;
    showSpinner = false;
    isMyComment = false;

    commentsForm: FormGroup = this.formBuilder.group({
        message: ['', [Validators.required]]
    })

    //   comments$? :Observable<CommentModel>[];
    // comments?: CommentModel[];

    comments: any[] = []

    constructor(private commentService: PostsService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private userService: UsersService
    ) { }

    ngOnInit(): void {
        this.myProfileInfo = this.userService.myProfile;
        console.log("current userID, comeent user id", this.myProfileInfo, this.myProfileInfo?.profilePictureUrl);

        let id = this.activatedRoute.snapshot.params['id']
        this.commentService.getComments(id).pipe(
            map(data => {
                this.comments = data.results,
                    console.log(" get comments ", data)
                console.log("post id", this.post?.user?.id);
                console.log("user id", this.comments[0].id);

            }),
        ).subscribe({
            next: () => {
                console.log("hii");
            }
        })
    }
    onImageError() {
        this.myProfileInfo!.profilePictureUrl = "../../assets/images/user_image.jpg"
        
    }
    onCommentImageError(){
        this.myProfileInfo!.profilePictureUrl = "../../assets/images/user_image_for_comment.webp"
    }

    createComment() {
        let id = this.activatedRoute.snapshot.params['id']
        const dto = new createCommentDto(this.commentsForm.value)
        console.log(dto);
        this.commentService.createComment(dto, id).subscribe({
            next: (data) => {
                this.showSpinner = true
                this.commentService.getComments(id).pipe(
                    map(data => this.comments = data.results),
                    finalize(() => {
                        this.showSpinner = false
                    })
                ).subscribe()
            }

        }
        )
    }
}