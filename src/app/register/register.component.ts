import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RegisterDto } from '../login/models/auth.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  hide = true;
  form : FormGroup = this.formBuilder.group({
    firstName :['',Validators.required],
    lastName :['',Validators.required],
    email :['',Validators.required,Validators.email],
    password :['',Validators.required,Validators.minLength(6)],

  })

  
  errors: string[] = [];

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router
    ) { }

 onSubmit(){
   const dto = new RegisterDto(this.form.value)
   this.authService.register(dto).subscribe({
     next:() => {
      this.router.navigateByUrl('login')
     },
     error:()=> {
      this.errors = [];
      this.authService.register(dto).subscribe({
        error: (err: HttpErrorResponse) => {
          console.log(err);
  
          switch (err.status) {
            case 400:
              this.errors = err.error.message;
              break;
            case 409:
              this.errors.push(err.message);
              break;
          }
        },
      });
      
     }
   })
   
 }

}
