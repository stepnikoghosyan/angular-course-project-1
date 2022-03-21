import { HttpErrorResponse } from '@angular/common/http';
import {  Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
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
  showSpinner = false;


  date = JSON.stringify(new Date());

  constructor(private formBuilder: FormBuilder, 
    private postsService: PostsService,
    private router:Router,
    private notification :ToastrService) { }
  createForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    imageUrl: [''],  
    updatedAt: [this.date]
   
})
  ngOnInit(): void {
  
  }
  createFormSubmit(){
  if(this.createForm.valid){
    const dto =new PostModelDto(this.createForm.value)
      this.postsService.createPost(dto).pipe(
        finalize(()=>{
            this.showSpinner = false;
        })
    ).subscribe({
        next: ()=>{
          this.notification.success("Thank you for filling out your information!", "Success massage")
          this.router.navigateByUrl('main/posts');
          
      },
        error:(err:HttpErrorResponse )=>{
            this.notification.error(err.statusText, `${err.status}`)
          
        }
        
      })
    }
  }
  onSelectFile(event:any){ 
    
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
   }

  }

  clearFile(e:any){
    this.targetValue=""
    this.isClose= false;
    this.errorMessage=""
  }

}
