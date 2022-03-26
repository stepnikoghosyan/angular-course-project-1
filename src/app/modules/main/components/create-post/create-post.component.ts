import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, of, Subject, takeUntil } from 'rxjs';
import { imageSizeValidation, imageTypeValidation } from '../../customValidators/imageValidators';
import { NotificationService } from 'src/app/shared/notification.service';
import { errorResponse } from '../../../../../utils/error-response.utility';
import { PostsService } from '../../services/posts.service';


@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit, OnDestroy {
    private subscription$ = new Subject<void>()
    errors: string[] = [];
    errorMessage: string = "";
    isTargetValue: string = "";
    isClose: boolean = false;
    showSpinner = false;
    file: any;


    constructor(private formBuilder: FormBuilder,
        private postsService: PostsService,
        private router: Router,
        private notifyService: NotificationService
    ) { }


    createForm: FormGroup = this.formBuilder.group({
        title: ['', Validators.required],
        body: ['', Validators.required],
        image: ['null', [imageTypeValidation(["jpeg", "jpg", "png"]), imageSizeValidation]],

    })

    get image() {
        return this.createForm.controls['image'];
    }
    ngOnInit(): void { }

    onSelectFile(event: any) {
        this.isTargetValue = event.target.files[0].name;
        this.isClose = true;

        if (event.target.files[0]) {

            this.file = <File>event.target.files[0]
            this.image.addValidators(imageSizeValidation(this.file));

        }
    }
    createFormSubmit() {
        const formData = new FormData();
        for (let key in this.createForm.value) {
            formData.append(key, this.createForm.value[key])
        }
        if (this.createForm.valid) {
            this.postsService.createPost(formData).pipe(
                takeUntil(this.subscription$),
                finalize(() => {
                    this.showSpinner = false;
                }),
                catchError((err) => {
                    this.notifyService.error(errorResponse(err), "Error");
                    return of([]);
                }))
                .subscribe({
                    next: (res) => {
                        this.notifyService.success("Thank you for filling out your information!", "Success massage")
                        this.router.navigateByUrl('main/posts');
                    },
                })
        } else {
            console.log('Form invalid');
            this.notifyService.error("", "No changes")
        }
    }

    clearFile(e: any) {
        this.isTargetValue = ""
        this.isClose = false;
        this.errorMessage = "";

    }

    ngOnDestroy(): void {
        this.subscription$.next()
        this.subscription$.complete()
    }

}
