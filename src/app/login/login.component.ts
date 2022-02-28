import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../auth.service";
import {LoginDto, LoginResponse} from "../models/auth.model";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  form: FormGroup = this.formBuilder.group({
    email: [''],
    password: [''],
    remember: ['']
  });
  errors: string[] = [];
  showPass: boolean = false;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
             ) { }

  onSubmit(): void {
    this.errors = [];
    const dto = new LoginDto(this.form.value);
    this.authService.login(dto).subscribe(
      {
        error: (err: HttpErrorResponse) => {
          switch (err.status) {
            case 400:
              this.errors = err.error.message;
              break;
            case 401:
            case 403:
              this.errors.push('Email is already exists.');
              break;
            default:
              this.errors.push("Something went wrong.");
          }
        }
      })
  }

  togglePass(): void {
   this.showPass = !this.showPass;
  }

}
