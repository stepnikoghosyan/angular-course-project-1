import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { RegisterDto } from '../module/pages';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {


  display:boolean = false;
  errorMessage: string = "";
  isError: boolean = false;
  isWait:boolean = false;
  constructor(private formBuilder:FormBuilder,
     private authService: AuthService, 
     private router:Router) { }

  
   isLoading: Subject<boolean> = this.authService.isLoading;

  registerForm = this.formBuilder.group({
    firstName:[, Validators.required],
    lastName:['', Validators.required],
    email:['',[Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.minLength(8)]],
  })
  onshowPasswordValue(){
    this.display = !this.display;
  };

  onSubmitRegister(){

    if(this.registerForm.valid){
      this.isLoading.subscribe()
       const dto = new RegisterDto(this.registerForm.value)
       this.authService.register(dto).subscribe({
            next:(res)=>{
                this.errorMessage = "";
                this.router.navigateByUrl('/login')
             },
            error:(err:HttpErrorResponse)=>{
              this.isError =true;
              switch (err.status){
                  case 400:
                    this.errorMessage = err.error.message;
                  break;
                  case 409:
                    this.errorMessage =err.error.message;
                  break;
                  case 403:
                    this.errorMessage = err.error.message;
                  break;
                  case 500:
                     this.errorMessage =  err.error.message;
                  break;
                  default:
                    console.log(err.status);
                    this.errorMessage = "something wait wrong"
                  
              }
          } 
        
      });

    }
 
  }
  ngOnInit(): void {
  }
 
}
