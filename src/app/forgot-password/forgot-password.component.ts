import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
// import { ForgotPasswordDto } from '../models/auth.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  errors: string[] = [];
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.formInit();
  }

  private formInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }
  
  private formReset(): void {
    this.submitted = false;
    this.resetPasswordForm.reset();
    this.errors = [];
  }

  public forgotPassword(): void {
    this.submitted = true
    if (this.resetPasswordForm.valid) {
      this.authService.forgotPassword(this.resetPasswordForm.value).subscribe({
        error: (err: HttpErrorResponse) => {
          switch (err.status) {
            case 400:
              this.errors.push(err.error.message);
              break;
            case 401:
            case 403:
              this.errors.push(err.error.message);
              break;
            default:
              this.errors.push('Something went wrong');
          }
        },
        next: ()=> {
          this.formReset();
        }
      })
    }
   
  }


}
