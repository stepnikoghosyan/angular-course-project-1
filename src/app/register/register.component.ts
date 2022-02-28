import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../auth.service";
import {RegisterDto} from "../models/auth.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: FormGroup = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    password: [''],
  });

  errors: string[] = [];
  constructor(private formBuilder: FormBuilder,private authService: AuthService) {}

  onSubmit() : void {
    const dto = new RegisterDto(this.form.value);
    this.authService.register(dto).subscribe({
      next: (data) => {
        console.log(data);
        this.errors = [];
      },
      error: (err: HttpErrorResponse) => {
        switch (err.status) {
          case 400:
            this.errors = err.error.message;
            break;
          case 409:
            this.errors.push('Email is already exists.');
            break;
          default:
            this.errors.push("Something went wrong.");
        }
        this.errors = err.error.message;
      }
    });
  }
}
