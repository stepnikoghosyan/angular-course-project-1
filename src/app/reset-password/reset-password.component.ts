import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordDto } from '../models/auth.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    errors: string[]= [];
    token!: any;
    newPassword = new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]);
    
    constructor(  private authService: AuthService,
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private router: Router
    ) {}

    ngOnInit(): void {
       this.token = this.activatedRoute.snapshot.params['activationToken'];
    }
  
    resetPasForm: FormGroup = this.formBuilder.group({
        newPassword: [''],
        token: ['']
    });

    formResetSubmit(){
        this.errors = [];
        if(this.token){
            this.resetPasForm.patchValue({token: `${this.token}`});
            const dto = new ResetPasswordDto(this.resetPasForm.value);
            this.authService.resetPassword(dto).subscribe({
                next: () =>{ 
                    this.resetPasForm.reset()
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
            });
        }
    }
}
