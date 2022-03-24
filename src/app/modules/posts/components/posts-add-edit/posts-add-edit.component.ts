import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize, Subject, takeUntil } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { PostsService } from "../../../post-card/services/posts.service";
import { NotificationService } from "../../../../services/notification.service";
import { PostFormModel, PostModel } from 'src/app/modules/post-card/models/post.model';
import { fileTypeValidator } from "../../validators/file-type.validator";
import { fileSizeValidator } from "../../validators/file-size.validator";
import { FILE_EXTENSIONS, FILE_SIZE_MEGABYTE } from "../../constants";

@Component({
  selector: 'app-posts-add-edit',
  templateUrl: './posts-add-edit.component.html',
  styleUrls: ['./posts-add-edit.component.scss']
})
export class PostsAddEditComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  postId: number | null = null;
  form!: FormGroup;
  fileName = '';
  isLoading = false;
  submitted = false;
  extension: string;
  fileSize: string;

  constructor(private formBuilder: FormBuilder,
    private postService: PostsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notifyService: NotificationService) {

    this.extension = FILE_EXTENSIONS.map(item => '.' + item).join(', ');
    this.fileSize = FILE_SIZE_MEGABYTE + 'MB';
    this.postId = this.activatedRoute.snapshot.params['id'];
    this.formInit();
  }

  ngOnInit(): void {
    this.getPostById();
  }

  private formInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
      image: [null, [fileTypeValidator(), fileSizeValidator()]]
    });
  }

  private getPostById(): void {
    if (this.postId) {
      this.isLoading = true;
      this.postService.getPostById(this.postId).pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => {
          this.isLoading = false;
        }))
        .subscribe({
          next: (data: PostModel) => {
            this.form.patchValue({
              title: data.title,
              body: data.body
            });
            if (data.imageUrl) {
              this.fileName = 'image';
            }
          },
          error: (err: HttpErrorResponse) => {
            this.notifyService.showNotification(false, err.error.message);
          }
        })
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.form.controls['image'].setValue(file);
    }
    if (this.form.controls['image'].invalid) {
      this.fileName = '';
    } else {
      this.fileName = file.name;
    }
  }

  deleteImage(): void {
    this.form.controls['image'].reset();
    this.fileName = '';
  }

  onSubmit(): void {
    if (this.submitted) {
      return;
    } else {
      if (this.form.valid) {
        const formValue = this.form.value;
        this.isLoading = true;
        this.submitted = true;
        if (this.postId) {
          this.updatePost(formValue);
        } else {
          this.createPost(formValue);
        }
      }
    }
  }

  private updatePost(formValue: PostFormModel): void {
    this.postService.updatePost(this.postId!, formValue)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => {
          this.isLoading = false;
          this.submitted = false;
        }))
      .subscribe({
        next: () => {
          this.notifyService.showNotification(true, "Successfully updated.", null, ['posts'])
        },
        error: (err: HttpErrorResponse) => {
          this.notifyService.showNotification(false, err.error.message);
        }
      });
  }

  private createPost(formValue: PostFormModel): void {
    this.postService.createPost(formValue)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => {
          this.isLoading = false;
          this.submitted = false;
        }))
      .subscribe({
        next: () => {
          this.notifyService.showNotification(true, "Successfully created.", null, ['posts'])
        },
        error: (err: HttpErrorResponse) => {
          this.notifyService.showNotification(false, err.error.message);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
