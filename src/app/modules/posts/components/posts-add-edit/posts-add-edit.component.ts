import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RegisterDto} from "../../../auth/models/auth.model";
import {finalize, Subject, takeUntil} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {CreatePostDto} from "../../models/post.model";
import {PostsService} from "../../../post-card/services/posts.service";
import {NotificationService} from "../../../../services/notification.service";

@Component({
  selector: 'app-posts-add-edit',
  templateUrl: './posts-add-edit.component.html',
  styleUrls: ['./posts-add-edit.component.scss']
})
export class PostsAddEditComponent {

  private unsubscribe$ = new Subject<void>();
  form!: FormGroup;
  fileName = '';
  formData = new FormData();
  isLoading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private postService: PostsService,
              private router: Router,
              private notifyService: NotificationService) {
    this.formInit();
  }

  private formInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.formData.append("file", file);
    }
  }

  onSubmit() {
    if (this.submitted) {
      return;
    } else {
      if (this.form.valid) {
        const dto = new CreatePostDto(this.form.value,this.formData);
        this.isLoading = true;
        this.submitted = true;
        this.postService.createPost(dto)
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
              this.showNotifications(true, err.error.message);
            }
          });
      }
    }
  }

  private showNotifications(success: boolean, message: string): void {
    if (success) {
      this.notifyService.showSuccess("Success", message);
      this.router.navigate(['posts']);
    } else {
      this.notifyService.showError("Error", message);
    }
  }

}
