import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../services/auth.service';
import {NotificationService} from "../services/notification.service";
import {Router} from "@angular/router";
import {finalize, Subject, takeUntil} from "rxjs";
import {EmailDto} from "../models/auth.model";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  resetPasswordForm!: FormGroup;
  submitted = false;
  isLoading = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private notifyService: NotificationService,
              private router: Router) {
    this.formInit();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private formInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  forgotPassword(): void {
    if (this.submitted) {
      return;
    } else {
      if (this.resetPasswordForm.valid) {
        this.isLoading = true;
        this.submitted = true;
        const emailDto = new EmailDto(this.resetPasswordForm.value);
        this.authService.forgotPassword(emailDto)
          .pipe(takeUntil(this.unsubscribe$),
            finalize(() => {
              this.isLoading = false;
              this.submitted = false;
            }))
          .subscribe({
            error: (err: HttpErrorResponse) => {
              this.showNotifications(false, err.error.message);
            },
            next: () => {
              this.showNotifications(true, ' ');
            }
          });
      }
    }
  }

  private showNotifications(success: boolean, message: string): void {
    if (success) {
      this.notifyService.showSuccess("Success", message);
      this.router.navigateByUrl('/login');
    } else {
      this.notifyService.showError("Error", message);
    }
  }
}
