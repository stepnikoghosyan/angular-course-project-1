import { HttpErrorResponse } from '@angular/common/http';
import {  Component,  OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { errorResponse } from '../../../../../utils/error-response.utility';
import { CreatePostModelDto } from '../../models/post.model';
import { PostsService } from '../../services/posts.service';


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
  cardImageBase64:string =""
 
  
  constructor(private formBuilder: FormBuilder, 
    private postsService: PostsService,
    private router:Router,
    private notification: ToastrService,
) { }
    
    
  createForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    image: [null],  
  
   
})

  ngOnInit(): void {

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
             let fileCount: number = event.target.files.length;
             for (let i = 0; i < fileCount; i++) {
              
              var file = <File> event.target.files[i]
        
                this.createForm.patchValue({
                  image: file
                })
            
            }

 
        //    const reader = new FileReader();
             
        //    reader.onload = (e: any) => {
             
        //       this.cardImageBase64= e.target.result;
            
        //      this.createForm.patchValue({
        //        image :event.target.files[0]});              } 
            
        // reader.readAsDataURL(event.target.files[0]);
      
    
     }
         
    } 
 }
  createFormSubmit(){
    const formData = new FormData();
    formData.append("title",this.createForm.get('title')?.value);
    formData.append("body",  this.createForm.get('body')?.value);
    formData.append("image", this.createForm.get('image')?.value)
    const dto = new CreatePostModelDto(this.createForm.value, formData);
    console.log("dto is",dto.image?.append("image", this.createForm.get('image')?.value))
    console.log("image",this.createForm.get('image')?.value)
   
    // formData.append("title",this.createForm.get('title')?.value);
    // formData.append("body",  this.createForm.get('body')?.value);
    // formData.append("image", this.file)
    
    this.postsService.createPost(dto).pipe(
        finalize(()=>{
         
            this.showSpinner = false;
        })
    ).subscribe({
        next: (res)=>{
           console.log(res)
          this.notification.success("Thank you for filling out your information!", "Success massage")
         // this.router.navigateByUrl('main/posts');
          
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
  
  clearFile(e:any){
    this.isTargetValue=""
    this.isClose= false;
    this.errorMessage="";
  }

}
