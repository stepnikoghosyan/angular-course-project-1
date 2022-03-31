import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PostDto } from 'src/app/models/post.model';
import { PostsService } from '../posts.service';
import { FileTypeValidator } from './file-type-validator.service';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PostComponent implements OnInit, OnDestroy {
  faCircleXmark = faCircleXmark;
  formGroup: FormGroup;
  sizeCheck = true;
  fileName = '';
  errorFile = '';
  isLoading = false;
  id: number = NaN;
  title = 'Create'
  private unsubscribe$ = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private avtiveRouter: ActivatedRoute,
  ) {
    this.formGroup = this.initForm();
  }

  ngOnInit(): void {

    this.showPostData();
  };

  showPostData() {
    this.id = this.avtiveRouter.snapshot.params['id'];
    if (this.id) {
      this.title = 'Edit',
        this.postsService.getPostById(this.id).pipe(takeUntil(this.unsubscribe$)).subscribe({
          next: (res: any) => {
            this.formGroup.patchValue({
              title: res.title,
              body: res.body,
              image: res.imageUrl
            })
            this.fileName = 'image'
          },
          error: (err: any) => {
            this.errorFile = err.error.message
          }
        })
    }
  }

  initForm() {
    return this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
      file: [null, [FileTypeValidator.fileTypeValidator,]
      ]

    })
  }


  sizeValidator(control: AbstractControl): ValidationErrors | null {
    if (this.formGroup.value.file > 2048) {
      return {
        sizeValidator: true
      }
    }
    return null
  }


  public clickOnFile(file: any): void {
    file.click()
  }



  public fileUpload(event: any): void {
    const file = event?.target?.files[0];
    console.log(file);
    if (file) {
      this.formGroup?.get('file')?.setValue(file);

    }

  }

  isInValid = false;
  public createPost() {
    if (this.formGroup.valid) {
      this.isLoading = true;
      const postDto = new PostDto(this.formGroup.controls)
      this.postsService.createPost(postDto)
        .subscribe(() => this.isLoading = false)
    } else {
      this.isInValid = true;
    }

  }

  public deleteImg() {
    this.formGroup.get('file')?.reset();
    this.fileName = ''
  }

  public savePost() {
    this.postsService.updatePost(this.id, this.formGroup.value)
      .subscribe()
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
