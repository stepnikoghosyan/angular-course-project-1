import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { errorResponse } from '../configs/error-response.config';
import { ForgotPasswordDto } from '../models/auth.model';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    showSpinner = false;
    errors:string[] = [];
    forgotPasForm: FormGroup = this.formBuilder.group({
        email: ['', [ Validators.required, Validators.email ]]
    });
    
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService ) {};
  
    ngOnInit(): void {}
  
    formSubmit(){
        this.showSpinner = true;
        if(this.forgotPasForm.valid){
            const dto = new ForgotPasswordDto(this.forgotPasForm.value);
            this.authService.forgotPassword(dto).pipe(
                finalize(()=> this.showSpinner = false
                )
            )
            .subscribe({
                next: ()=>{  
                    this.forgotPasForm.reset();
                },
                error: (err: HttpErrorResponse) => {
                    switch(err.status){
                    case 400: 
                        this.errors = errorResponse(err);
                        break;
                    case 401: 
                        this.errors = errorResponse(err);
                        break;
                    default:
                        this.errors.push("Something went wrong")
                    }
                }
            })
        } 
    }
}
