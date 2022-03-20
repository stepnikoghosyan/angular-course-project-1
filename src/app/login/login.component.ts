import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../models/auth.model';
import { finalize, Subject, Subscription } from 'rxjs';
import { errorResponse } from '../../utils/error-response.utility';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements  OnDestroy{
    private subscription$ = new Subject<void>()
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


    loginFormSubmit(){
        this.showSpinner = true;
        if(this.loginForm.valid){
            const dto = new LoginDto(this.loginForm.value);
            this.errors = [];
            this.authService.login(dto, this.loginForm.controls['remember'].value)
            .pipe(
                finalize(() => {        
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
    // ngOnInit() :void {
    //     this.loginForm.controls['password'].setValue("azazaz")
    // }

    ngOnDestroy(): void {
        this.subscription$.next()
        this.subscription$.complete()
    }

    toggleShowPassoword(){
        this.showEyeIcon = !this.showEyeIcon;
    };
}
