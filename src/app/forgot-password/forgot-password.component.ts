import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import {NotificationService} from "../services/notification.service";

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
              private authService: AuthService,
              private notifyService: NotificationService) { }

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
          this.notifyService.showError("Error", err.error.message);
        },
        next: ()=> {
          this.formReset();
        }
      })
    }
  }
}
