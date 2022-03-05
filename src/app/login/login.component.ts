import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
    showSpinner = false
    errors:string[] = [];
    
    loginForm: FormGroup = this.formBuilder.group({
        email: ['', [Validators.required,Validators.email]],
        password: ['',[Validators.required,  Validators.minLength(6)]],
        remember:['']
                     
                  
    })

    constructor( private formBuilder: FormBuilder,
                 private authService: AuthService,) {}

    ngOnInit(): void {}

    loginFormSubmit(){
        this.showSpinner=true
        if(this.loginForm.valid){
            const dto = new LoginDto(this.loginForm.value);
            this.errors = [];
            this.authService.login(dto,this.loginForm.controls['remember'].value).subscribe({ 
                next: ()=> {    
                    this.showSpinner=true
                    console.log(this.loginForm.controls['remember']);
                },
                error: (err: HttpErrorResponse) => {
                    this.showSpinner=false
                    switch(err.status){
                        case 400: 
                        this.errors=err.error.message
                            break;
                        case 401: 
                            this.errors.push(err.message);
                            break;
                            case 403:
                                this.errors.push(err.message)
                                break
                            case 404:
                                this.errors.push(err.message)
                                break;
                        default:
                            this.errors.push("Something went wrong")
                    }
                }
            })
        }
    }
}
