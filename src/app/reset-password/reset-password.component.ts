import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { errorResponse } from '../configs/error-response.config';
import { ResetPasswordDto } from '../models/auth.model';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    
    errors: string[]= [];
    token: string | undefined;
        
    resetPasForm: FormGroup = this.formBuilder.group({
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        token: ['']
    });
    
    constructor(  private authService: AuthService,
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private notifyService: NotificationService
    ) {};

    ngOnInit(): void {
       this.token = this.activatedRoute.snapshot.params['activationToken'];
       if(this.token){
            this.resetPasForm.controls['token'].setValue(this.token);
       }else{
           this.notifyService.error("Somthineg went wrong, try again", "Error!!");
           this.router.navigateByUrl('/forgot-password');
       }
    };

    formResetSubmit(){
        if(this.resetPasForm.valid){
            const dto = new ResetPasswordDto(this.resetPasForm.value);
            this.authService.resetPassword(dto).subscribe({
                
                error: (err: HttpErrorResponse) => {
                    this.errors = [];
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
            });
        }  
    }
}
