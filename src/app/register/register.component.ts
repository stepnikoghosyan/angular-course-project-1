import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterDto } from '../models/auth.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    hide = true
    showSpinner = false;
    errors: string[] = [];
    registerForm: FormGroup = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required], 
        email: ['', [Validators.required, Validators.email] ], 
        password: ['', [Validators.required, Validators.minLength(6)]]           
    });

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                ) {}

    ngOnInit(): void {}

    registerFormSubmit(){
        this.showSpinner = true;
        const dto = new RegisterDto(this.registerForm.value);
        if(this.registerForm.valid){
            this.authService.register(dto).pipe(
                finalize(()=>{
                    this.showSpinner=false
                })
            )
            .subscribe({
                error: (err: HttpErrorResponse) => {
                    this.errors = [];
                    switch(err.status){
                        case 400:
                            this.errors.push(err.error.message);
                            break;                     
                        case 409:
                            this.errors.push(err.error.message);
                            break;
                        default: 
                            this.errors.push('Something went wrong');
                    }
                } 
            })
        }
    }

}
