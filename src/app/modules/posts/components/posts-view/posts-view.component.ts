import { Component, OnInit } from '@angular/core';
import {catchError, finalize, map, Observable, of, Subject, takeUntil} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostsService} from "../../../post-card/services/posts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../../services/notification.service";
import {CreatePostDto} from "../../models/post.model";
import {HttpErrorResponse} from "@angular/common/http";
import {PostModel} from "../../../post-card/models/post.model";

@Component({
  selector: 'app-posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.scss']
})
export class PostsViewComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  form!: FormGroup;
  fileName = '';
  formData = new FormData();
  isLoading = false;
  submitted = false;
  currentPostId!: number;
  post?: PostModel ;

  constructor(private formBuilder: FormBuilder,
              private postService: PostsService,
              private router: Router,
              private notifyService: NotificationService,
              private route: ActivatedRoute) {
    this.formInit();
    this.currentPostId = this.route.snapshot.params['id']
  }

  ngOnInit(): void {
    this.post = this.getPost();
  }

  getPost() : any{
    this.postService.getPostById(this.currentPostId)
      .pipe(takeUntil(this.unsubscribe$),
        finalize(() => {
          this.isLoading = false;
          this.submitted = false;
        }))
      .subscribe({
        next: (data) => {
          return data;
        },
        error: (err: HttpErrorResponse) => {
          this.showNotifications(true, err.error.message);
        }
      });
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
      // if (this.form.valid) {
      //   const dto = new CreatePostDto(this.form.value,this.formData);
      //   this.isLoading = true;
      //   this.submitted = true;
      //   this.postService.createPost(dto)
      //     .pipe(takeUntil(this.unsubscribe$),
      //       finalize(() => {
      //         this.isLoading = false;
      //         this.submitted = false;
      //       }))
      //     .subscribe({
      //       next: () => {
      //         this.showNotifications(true, "Successfully created.")
      //       },
      //       error: (err: HttpErrorResponse) => {
      //         this.showNotifications(true, err.error.message);
      //       }
      //     });
      // }
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
