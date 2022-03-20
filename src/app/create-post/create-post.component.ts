import {  Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostModelDto } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  errorMessage:string ="";
  targetValue:string ="";
  isClose:boolean = false;
 // selectedFile:File = null;

  date = JSON.stringify(new Date());

  constructor(private formBuilder: FormBuilder, 
    private postsService: PostsService) { }
  createForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    imageUrl: [''],  
    updatedAt: [this.date]
   
})
  ngOnInit(): void {
  }
  createFormSubmit(){
   const dto =new PostModelDto(this.createForm.value)
    this.postsService.createPost(dto).subscribe({
          next(res){
              console.log(res)
              console.log(dto)
          }
    })
  }
  onSelectFile(event:any){ 
    //this.selectedFile = event.target.files[0];
    this.targetValue = event.target.files[0].name;
   if(event.target.files && event.target.files[0]){
     this.isClose = true;
     this.errorMessage = "The file must be in JPEG, JP OR PNG format"
     if(event.target.files[0].type === "image/jpeg" ||
      event.target.files[0].type === "image/jpg" ||
      event.target.files[0].type === "image/png"){
        this.errorMessage ="" 
        if(event.target.files[0].size >200000){
          this.errorMessage="The file must not be greater 2MG"
        }
      }

      var reader = new FileReader();
      reader.onload=(event: any)=>{
        console.log(event.target.result)
        
       
      }
      reader.readAsDataURL(event.target.files[0])
   }

  }

  clearFile(e:any){
    this.targetValue=""
    this.isClose= false;
    this.errorMessage=""
  }
  
}
