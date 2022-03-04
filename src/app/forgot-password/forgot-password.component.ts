import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordDto } from '../models/auth.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    isSuccess = false;
    message!:string;
    errors:string[] = [];
    email = new FormControl('', [
                Validators.required,
                Validators.email,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]);
    
    forgotPasForm: FormGroup = this.formBuilder.group({
        email: this.email
    });
    
    
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService) { }
  
    ngOnInit(): void {}
  
    formSubmit(){
        if(this.forgotPasForm){
            const dto = new ForgotPasswordDto(this.forgotPasForm.value)
        this.authService.forgotPassword(dto).subscribe({
            next: ()=>{  
                    
                    this.isSuccess = true;
                    this.message = "Success!";
                    this.forgotPasForm.reset();
                    setTimeout(()=>  this.isSuccess = false, 3000);

                },
                error: (err: HttpErrorResponse) => {
                    switch(err.status){
                    case 400: 
                        this.errors = err.error.message;
                        break;
                    case 401: 
                        this.errors.push(err.message);
                        break;
                    default:
                        this.errors.push("Something went wrong")
                    }
                }
            })
        } 
    }
}
