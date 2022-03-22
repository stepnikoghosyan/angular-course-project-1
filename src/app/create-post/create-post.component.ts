import { HttpErrorResponse } from '@angular/common/http';
import {  Component,  OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { errorResponse } from '../configs/error-response.config';
import { CreatePostModelDto } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  errors:string[] = [];
  errorMessage:string ="";
  isTargetValue:string = "";
  isClose:boolean = false;
  showSpinner = false;
  cardImageBase64:string="";
  
  constructor(private formBuilder: FormBuilder, 
    private postsService: PostsService,
    private router:Router,
    private notification :ToastrService) { }
    
    
  createForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    image: [''],  
  
   
})
  ngOnInit(): void {
    
  }

  createFormSubmit(){
    const dto =new CreatePostModelDto(this.createForm.value)
      console.log(dto);
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
          console.log(err)
          switch(err.status){
            case 400:
            case 401:
            case 403:
            case 404:
                this.errors = errorResponse(err);
                break;
            default:
                this.errors.push("Something went wrong");
        }
            // this.notification.error(err.statusText, `${err.status}`)
          
        }
        
      })
    
  }
  onSelectFile(event:any){ 
     if(event.target.files && event.target.files[0]){
      this.errorMessage = "The file must be in JPEG, JPG OR PNG format"
        if(event.target.files[0].type === "image/jpeg" ||
          event.target.files[0].type === "image/jpg" ||
          event.target.files[0].type === "image/png"){
            this.errorMessage ="" 
            this.isClose = true;
            this.isTargetValue = event.target.files[0].name;
             if(event.target.files[0].size >200000){
                this.errorMessage="The file must not be greater 2MG";
                
              }
             const reader = new FileReader();
              
            reader.onload = (e: any) => {
              const image = new Image();
               image.src= e.target.result;
              
              this.createForm.patchValue({
                image :image.src});
                      
              } 
             
         reader.readAsDataURL(event.target.files[0]);
      
        }
          
     } 
  }
  clearFile(e:any){
    this.isTargetValue=""
    this.isClose= false;
    this.errorMessage="";
  }

}
