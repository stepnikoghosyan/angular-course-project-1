import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../services/auth.service';
import {NotificationService} from "../services/notification.service";
import {Router} from "@angular/router";
import {take} from "rxjs";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  errors: string[] = [];
  submitted: boolean = false;
  public isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private notifyService: NotificationService,
              private router: Router) { }

  ngOnInit(): void {
    this.formInit();
  }

  private formInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  public forgotPassword(): void {
    this.submitted = true
    if (this.resetPasswordForm.valid) {
      this.isLoading = true;
      this.authService.forgotPassword(this.resetPasswordForm.value).pipe(take(1)).subscribe({
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.notifyService.showError("Error", err.error.message);
        },
        next: ()=> {
          this.isLoading = false;
          this.router.navigateByUrl('/home');
        }
      })
    }
  }
}
