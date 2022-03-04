import { HttpErrorResponse } from '@angular/common/http';
import { taggedTemplate } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime,  of, } from 'rxjs';
import { AuthService } from '../auth.service';
import { LoginDto } from '../module/pages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
display:boolean = false;
isChecked:boolean = false;
response:any;
errorMessage:any ;
isError: boolean = false;
 
  constructor(private formBuilder:FormBuilder, 
    private activatedRoute: ActivatedRoute,
     private authService: AuthService, 
     private router:Router) { }

  loginForm = this.formBuilder.group({
    email:['',[Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.minLength(8)]],
    acceptLogin:[false, Validators.requiredTrue]
  })  
 
  onshowPasswordValue():void{
       this.display = !this.display;
       
  }
   
  onSubmitLogin(){
    
    console.log(this.loginForm.value)
    const dto = new LoginDto(this.loginForm.value)
      this.authService.login(dto).subscribe({
        
        next:(response)=>{
          
          console.log(dto)
            this.response = response;
          console.log(this.response);

        
      },
        error:(err:HttpErrorResponse)=>{
          this.isError =true;
            switch (err.status){
                case 400:
                   this.errorMessage = err.message;
                 break;
                case 409:
                   this.errorMessage = err.message;
                break;
                case 403:
                  this.errorMessage = err.message;
               break;
               case 500:
                this.errorMessage = err.message;
             break;
                default:
                  this.errorMessage = "Something wait wrong";
            }
        } 
        
      
      })
      
      
  }

  changeField(value:any):boolean{
  
    //stextum enq loginDto tipi instance u poxanum loginFormoi object

    if(this.loginForm.value && value.currentTarget.checked){
      this.isChecked = value.currentTarget.checked;
      localStorage.setItem("userInf",JSON.stringify(this.loginForm.value))
    }
    return this.isChecked;

  }
  checked(request:any){
    

  }
}


