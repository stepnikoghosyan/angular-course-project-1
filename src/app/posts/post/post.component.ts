import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PostComponent implements OnInit {

  formGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.formGroup = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
      file: [],
    })
  }

  public trigger(file: any): void {
    file.click()
  }

  public bytesToSize(bytes: number) {
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    let byte = Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
    console.log('byte', byte)

    // const byte = (bytes / 1073741824).toFixed(2)

  }

  img !: any;
  file!: File;
  event!:any;
  public hendler(event: any): void {
    this.event = event
    this.file = event.target?.files[0];
    if (!event.target.files?.length) return
    if (!this.file.type.match('image')) return

    const reader = new FileReader();
    reader.onload = ev => {
     
        
        console.log(ev.target?.result)
        console.log('name', this.file.name);
        console.log('size', this.file.size);
        this.bytesToSize(this.file.size);
        this.img = ev.target?.result;
      
    }

    reader.readAsDataURL(this.file);
    // const formData = new FormData();
    // formData.append('user', this.frames.userData.user.toString())
    // formData.append('image', this.file);
    // formData.append('thumb_image', files);
    // this.spinner.show();
    // this.userImagsServicw.userImage(formData).subscribe((userImage: UserImage) => {
    //   this.frames.fileList.unshift(userImage);
    //   this.spinner.hide();
    // })
  }

}
