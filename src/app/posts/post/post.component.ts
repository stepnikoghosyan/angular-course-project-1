import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PostDto } from 'src/app/models/post.model';
import { PostsService } from '../posts.service';
import { FileSizeValidator } from './file-size-validator.service';
import { FileTypeValidator } from './file-type-validator.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PostComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;
  sizeCheck = true;
  img: any;
  fileName = '';
  errorFile = '';
  fileType = '';
  isLoading = false;
  id: number = NaN;
  title = 'Create'
  private unsubscribe$ = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private avtiveRouter: ActivatedRoute,
    // public typeValidator: FileTypeValidator,
    //  public sizeValidator: FileSizeValidator
  ) { }

  ngOnInit(): void {
    this.initForm();
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
    this.formGroup = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
      file: [null,  [FileTypeValidator.fileTypeValidator,]
      ]

      // this.sizeValidator.bind(this)
    })
  }


  sizeValidator(control: AbstractControl): ValidationErrors | null {
 

    if (this.formGroup.value.file > 2048) {
      return {
        sizeValidator: true//'file size should not be more than 2mb'
      }
    }
    return null

  }


  public trigger(file: any): void {
    file.click()
  }


  file!: File 
  public handler(event: any): void {

    if (!event.target.files?.length) return
    if (event?.target.files && event.target.files[0]) {
      this.file = event.target?.files[0];

      this.formGroup.patchValue({
        'file': event.target?.files[0]
      })
      
      console.log('hendler',this.formGroup.get('file'))
      this.formGroup.get('file')?.reset();

    }

  }

  public create() {

    console.log('create', this.formGroup.controls['file'].errors!['fileTypeValidator'] );

    if (this.formGroup.valid) {
      this.isLoading = true

      const image = this.img
      const postDto = new PostDto(this.formGroup.value, image)
      this.postsService.createPost(postDto)
        .subscribe(() => this.isLoading = false)
    }

  }

  public deleteImg() {
    this.formGroup.get('file')?.reset();
    this.fileName = ''
  }

  public save() {
    this.postsService.updatePost(this.id, this.formGroup.value)
      .subscribe()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
