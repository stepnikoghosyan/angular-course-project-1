import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../models/auth.model';
import { finalize, Subscription } from 'rxjs';
import { errorResponse } from '../configs/error-response.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{
    private subscription! :Subscription
    showSpinner = false;
    errors:string[] = [];
    showEyeIcon = true;

    @ViewChild("showPassword") showPassword!: ElementRef<HTMLInputElement>;
    
    loginForm: FormGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['',[Validators.required, Validators.minLength(6)]],
        remember:['']
    });

    constructor( private formBuilder: FormBuilder,
                 private authService: AuthService,
                 private renderer: Renderer2) {}

    ngOnInit(): void {}

    loginFormSubmit(){
        this.showSpinner=true
        if(this.loginForm.valid){
            const dto = new LoginDto(this.loginForm.value);
            this.errors = [];
           this.subscription=this.authService.login(dto, this.loginForm.controls['remember'].value).pipe(
                finalize(()=>{
                    this.showSpinner = false;
                })
            )
            .subscribe({ 
                error: (err: HttpErrorResponse) => {
                    switch(err.status){
                        case 400:
                            this.errors = errorResponse(err);
                            break;
                        case 401:
                            this.errors = errorResponse(err);
                            break;
                        case 403:
                            this.errors = errorResponse(err);
                            break;
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

    toggleShowPassoword(){
        this.showEyeIcon = !this.showEyeIcon;
    }
    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe()
        }
    }
}
