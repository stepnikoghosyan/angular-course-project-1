import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../models/auth.model';
import { finalize, Subscription } from 'rxjs';
import { errorResponse } from '../../utils/error-response.utility';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{
    private subscription! :Subscription
    showSpinner = false;
    showEyeIcon = true;
    errors:string[] = [];

    @ViewChild("showPassword") showPassword!: ElementRef<HTMLInputElement>;
    
    loginForm: FormGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        remember: ['']
    });

    constructor( private formBuilder: FormBuilder,
                 private authService: AuthService,
                ) {}

    ngOnInit(): void {
        console.log("loginForm init", this.loginForm.value);
    }

    loginFormSubmit(){
        console.log("submit lofinForm", this.loginForm.value);
        this.showSpinner = true;
        console.log("is form valid?", this.loginForm.valid);
        if(this.loginForm.valid){
            const dto = new LoginDto(this.loginForm.value);
            this.errors = [];
            this.subscription = this.authService.login(dto, this.loginForm.controls['remember'].value).pipe(
                finalize(() => {
                    console.log("lofinForm", this.loginForm.value);
                    
                    this.showSpinner = false;
                })
            )
            .subscribe({ 
                error: (err: HttpErrorResponse) => {
                    
                    switch(err.status){
                        case 400:
                        case 401:
                        case 403:
                        case 404:
                            this.errors = errorResponse(err);
                            break;
                        default:
                            this.errors.push("Something went wrong");
                    }
                }
            })
        }
    };

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe()
        }
    }

    toggleShowPassoword(){
        this.showEyeIcon = !this.showEyeIcon;
    };
}
