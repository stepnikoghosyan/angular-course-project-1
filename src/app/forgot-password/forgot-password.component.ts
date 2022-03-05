import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordDto } from '../models/auth.model';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    
    errors:string[] = [];
    forgotPasForm: FormGroup = this.formBuilder.group({
        email: ['', [ Validators.required, Validators.email ]]
    });
    
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private notifyService: NotificationService) {};
  
    ngOnInit(): void {}
  
    formSubmit(){
        if(this.forgotPasForm.valid){
            const dto = new ForgotPasswordDto(this.forgotPasForm.value);
            this.authService.forgotPassword(dto).subscribe({
                next: ()=>{  
                    this.notifyService.success("Check your email", "Success!");
                    this.forgotPasForm.reset();
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
