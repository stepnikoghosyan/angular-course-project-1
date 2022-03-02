import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginDto, LoginResponse } from '../models/auth.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup = this.formBuilder.group ({
    email: [""],
    password: [""],

  })

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              private router: Router)   {
    this.loginForm = this.formBuilder.group({
      email: ["" , [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
   }
   onSubmit() {
     const dto = new LoginDto(this.form.value);
     this.authService.login(dto).subscribe({
       next: (data: LoginResponse) => {
         this.router.navigateByUrl('/home');
       },
     });
   }

    
    
  }


