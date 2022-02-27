import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ResetPassword } from '../models/reset-password.model';
import { ResetPasswordService } from '../services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  public passwordForm!: FormGroup;
  public errorMessage!: string;
  public isShowPassword: boolean = false;
  public isLoading: boolean = false;
  constructor(private activatedRoute: ActivatedRoute,
    private resetPasswordService: ResetPasswordService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.passwordForm = this.formBuilder.group({
      newPassword: [null, [Validators.required, Validators.minLength(6)]]
    })
  }

  changePasswordType(): void {
    this.isShowPassword = !this.isShowPassword;
  }
  
  resetPassword(): void {
    if (this.passwordForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.passwordForm.disable();
      const token = this.activatedRoute.snapshot.params['token'];
      const sendObject: ResetPassword = {
        token: token,
        newPassword: this.passwordForm.value.newPassword
      }
      this.resetPasswordService.resetPassword(sendObject).pipe(takeUntil(this.unsubscribe$),
        finalize(() => { this.isLoading = false; this.passwordForm.enable() }),
      )
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/home');
          },
          error: (err) => {
            this.errorMessage = err.error.message;
          }
        })
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}