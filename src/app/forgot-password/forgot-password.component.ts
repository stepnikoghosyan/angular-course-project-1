import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, Subject, Subscription } from 'rxjs';
import { errorResponse } from '../../utils/error-response.utility';
import { ForgotPasswordDto } from '../models/auth.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
    private subscription$ = new Subject<void>() 
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
    ngOnDestroy(): void {
      this.subscription$.next()
      this.subscription$.complete()
    }
}
