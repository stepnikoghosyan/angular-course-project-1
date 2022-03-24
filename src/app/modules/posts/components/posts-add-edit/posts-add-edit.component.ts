import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize, Subject, takeUntil} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {PostsService} from "../../../post-card/services/posts.service";
import {NotificationService} from "../../../../services/notification.service";
import {PostModel} from 'src/app/modules/post-card/models/post.model';

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
  extension = '.jpg, .jpeg, .png';

  constructor(private formBuilder: FormBuilder,
    private postService: PostsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notifyService: NotificationService) {
    this.formInit();
  }

  ngOnInit(): void {
    this.getPostById();
  }

  private formInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
      image: [null]
    });
  }

  private getPostById(): void {
    this.postId = this.activatedRoute.snapshot.params['id'];
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
              body: data.body,
              image: data.imageUrl
            });
            if (data.imageUrl) {
              this.fileName = 'image';
            }
          },
          error: (err: HttpErrorResponse) => {
            this.showNotifications(true, err.error.message);
          }
        })
    }
  }

  private convertByteToMegaByte(size: number): number {
    const megaBytes = 1024 * 1024;
    const decimal = 3;
    const fileSize = +(size / megaBytes).toFixed(decimal);
    return fileSize;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const fileSize = this.convertByteToMegaByte(file.size);
      const fileExtension = file.name.split('.').pop();
      if (fileSize > 2) {
        this.showNotifications(false, 'The size of the picture should be smaller than 2MB');
        return;
      }
      if (!fileExtension || this.extension.indexOf(`.${fileExtension.toLocaleLowerCase()}`) === -1) {
        this.showNotifications(false, `The picture must be ${this.extension}`);
        return;
      }
      this.form.controls['image'].setValue(file);
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
        // const dto = new CreatePostDto(this.form.value, this.formData);
        const formValue = this.form.value;
        const formData = new FormData();
        formData.append('title', formValue.title);
        formData.append('body', formValue.body);
        if (formValue.image && typeof (formValue.image) !== 'string') {
          formData.append('image', formValue.image);
        }
        this.isLoading = true;
        this.submitted = true;
        if (this.postId) {
          this.updatePost(formData);
        } else {
          this.createPost(formData);
        }
      }
    }
  }

  private updatePost(formData: FormData): void {
    this.postService.updatePost(this.postId!, formData)
      .pipe(takeUntil(this.unsubscribe$),
        finalize(() => {
          this.isLoading = false;
          this.submitted = false;
        }))
      .subscribe({
        next: () => {
          this.showNotifications(true, "Successfully created.")
        },
        error: (err: HttpErrorResponse) => {
          this.showNotifications(false, err.error.message);
        }
      });
  }
  private createPost(formData: FormData): void {
    this.postService.createPost(formData)
      .pipe(takeUntil(this.unsubscribe$),
        finalize(() => {
          this.isLoading = false;
          this.submitted = false;
        }))
      .subscribe({
        next: () => {
          this.showNotifications(true, "Successfully created.")
        },
        error: (err: HttpErrorResponse) => {
          this.showNotifications(false, err.error.message);
        }
      });
  }
  private showNotifications(success: boolean, message: string): void {
    if (success) {
      this.notifyService.showSuccess("Success", message);
      this.router.navigate(['posts']);
    } else {
      this.notifyService.showError("Error", message);
    }
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
