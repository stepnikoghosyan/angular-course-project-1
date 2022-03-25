import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PostDto } from 'src/app/models/post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PostComponent implements OnInit {

  formGroup!: FormGroup;
  sizeCheck = true;
  isImage = true;
  img !: any;
  fileName = '';
  errorFile = '';
  fileSizeError = '';
  fileType = '';
  isLoading = false;
  id: number = NaN;
  title = 'Create'
  private unsubscribe$ = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private avtiveRouter: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.initForm();
    this.showPostData();
  }

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
      file: [null, []],
    })
  }

  public trigger(file: any): void {
    file.click()
  }

  public kbytesToSize(kbytes: number): boolean {

    if (kbytes <= 2048) {
      this.sizeCheck = true;
      this.fileSizeError = '';
    } else {
      this.sizeCheck = false;
      this.errorFile = '';
      this.fileSizeError = 'file size should not be more than 2mb';
    }
    return this.sizeCheck;
  }


  public fileTypeCheck(type: string): boolean {

    if (type === "image/jpeg" || type === "image/png") {
      this.isImage = true;
      this.errorFile = '';
    } else {
      this.isImage = false;
      this.fileSizeError = '';
      this.errorFile = 'Please upload JPEG, JPG or PNG files'
    }
    return this.isImage
  }

  public handler(event: any): void {

    if (!event.target.files?.length) return
    if (event?.target.files && event.target.files[0]) {
      let file = event.target?.files[0];

      if (this.fileTypeCheck(file.type) && this.kbytesToSize(file.size)) {
        this.errorFile = ''
        const reader = new FileReader();
        reader.onload = ev => {
          let fileArr = this.formGroup.get('file')?.value.split('\\');
          this.fileName = fileArr[fileArr.length - 1];

          this.fileType = file.type;
          this.img = ev.target?.result;
        }
        reader.readAsDataURL(file);
      }
      else {
        this.formGroup.get('file')?.reset();

      }

    }

  }

  public create() {

    if (this.formGroup.valid && this.sizeCheck && this.isImage) {
      this.isLoading = true
      const image = {
        type: this.fileType,
        format: this.img,
      }
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
}
