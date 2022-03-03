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
    errors:string[] = [];
    
    loginForm: FormGroup = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', ,
                    ]
                    //Validators.required, 
                   // Validators.minLength(6)
    })

    constructor( private formBuilder: FormBuilder,
                 private authService: AuthService,) {}

    ngOnInit(): void {}

    loginFormSubmit(){
        console.log("LOGIN");
        if(this.loginForm){
            const dto = new LoginDto(this.loginForm.value);
            this.errors = [];
            this.authService.login(dto).subscribe({
                next: ()=> {
                    this.loginForm.reset();
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
