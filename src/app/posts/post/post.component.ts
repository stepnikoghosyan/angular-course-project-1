import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostDto } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PostComponent implements OnInit {

  formGroup!: FormGroup;
  chapiMej = true;
  isImage = true;
  img !: any;
  fileName = '';
  errorFile = '';
  fileSizeError = '';
  fileType = '';
  constructor(
    private fb: FormBuilder,
    private postsService: PostsService
  ) { }


  ngOnInit(): void {
    this.initForm()
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
      this.chapiMej = true;
      this.fileSizeError = '';
    } else {
      this.chapiMej = false;
      this.errorFile = '';
      this.fileSizeError = 'file size should not be more than 2mb';
    }
    return this.chapiMej;
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
          console.log('result', ev.target?.result)

          let fileArr = this.formGroup.get('file')?.value.split('\\');
          this.fileName = fileArr[fileArr.length - 1];

          console.log(file);
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

    if (this.formGroup.valid) {

      const image = {
        type: this.fileType,
        format: this.img,
      }
      const postDto = new PostDto(this.formGroup.value,image)
      this.postsService.createPost(postDto)
        .subscribe({
          next: (res) => { console.log(res) }
        })
    }

  }
  public deleteImg() {
    this.formGroup.get('file')?.reset();
    this.fileName = ''
  }
}
