import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { imageTypeValidation } from 'src/app/modules/main/customValidators/imageValidators';
import { imageSizeValidation } from 'src/app/modules/main/customValidators/imageValidators';
import { PostModel } from '../../models/post.model';
import { NotificationService } from '../../../../services/notification.service';
import { PostsService } from '../../services/posts.service';

@Component({
    selector: 'app-edit-post',
    templateUrl: './edit-post.component.html',
    styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {
    @ViewChild('file') el!: ElementRef;
    private subscription$ = new Subject<void>()
    post!: PostModel;
    targetValue!: string | null;
    isClicked = true;
    isHidden = false;
    showSpinner = false;
    fileName = '';


    updateForm: FormGroup = this.formBuilder.group({
        title: ['', Validators.required],
        body: ['', Validators.required],
        imageUrl: ['', [imageTypeValidation(["jpeg", "jpg", "png"]), imageSizeValidation]],
    })


    constructor(private formBuilder: FormBuilder,
        private postService: PostsService,
        private activatedRoute: ActivatedRoute,
        private notifyService: NotificationService) { }
    ngOnInit(): void {
        this.showSpinner = true;
        let id = this.activatedRoute.snapshot.params['id'];
        this.postService.getPost(id)
            .pipe(takeUntil(
                this.subscription$),
                finalize(() =>
                    this.showSpinner = false
                )
            )
            .subscribe({
                next: (data) => {
                    console.log("POST DATA", data);
                    this.post = data;
                    this.targetValue = this.post?.imageUrl;
                    console.log("IMAGEURL", this.post?.imageUrl);
                    this.updateForm.controls['imageUrl'].setValue(this.post?.imageUrl);
                    this.updateForm.controls['title'].setValue(this.post?.title);
                    this.updateForm.controls['body'].setValue(this.post?.body);

                }
            })
    }

    onUpdateForm() {

        console.log("PostID", this.post.id);
        console.log("post valid", this.updateForm.valid);

        if (this.updateForm.valid) {
            this.showSpinner = true;
            this.postService.putPost(this.post.id, this.updateForm)
                .pipe(takeUntil(
                    this.subscription$),
                    finalize(() =>
                        this.showSpinner = false)
                )
                .subscribe({
                    error: (err: HttpErrorResponse) => {
                        console.log('ERROR MESSAGE', err.message);
                    }
                })
        } else {
            console.log('Form invalid');
            this.notifyService.error("", "No changes")
        }
    }

    selectFile(event: any) {

        this.targetValue = event.target.files[0].name
        if (this.targetValue) {
            this.isHidden = true;
        }
        if (event.target.files[0]) {
            const file = <File>event.target.files[0]
            this.updateForm.controls['imageUrl'].addValidators(imageSizeValidation(file));
        }
    }
    removeFile() {
        this.targetValue = "";
        this.isHidden = false;
    }
    ngOnDestroy(): void {
        this.subscription$.next()
        this.subscription$.complete()
    }
}