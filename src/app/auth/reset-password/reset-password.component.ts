import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  showPassword = false;
  text = 'password';
  errMessage!: string;
  isTouched = false;
  isLoader = false;
  unSubscribe$ = new Subject();
  
  resetForm: FormGroup = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
  })

  constructor(private fb: FormBuilder,
    private activedRoute: ActivatedRoute,
    private authService: AuthService,
    private routes: Router,
    private notifyService: NotificationService
  ) { }

  resetPassword() {
    if (this.resetForm.valid) {
      this.isLoader = true;
      const token = this.activedRoute.snapshot.paramMap.get('token') as string;
      const resetPass = {
        newPassword: this.resetForm.get('newPassword')?.value,
        token: token,
      }
      this.authService.resetPassword(resetPass).pipe(takeUntil(this.unSubscribe$)).subscribe(() => {
        this.isLoader = false;
        this.notifyService.showSuccess("Success", "Password is changed");
        this.routes.navigateByUrl('/home');
      },
      (err) => {
        this.isLoader = false;
        this.notifyService.showError("Error", err.error.message);
      }
      )

    }
  }

  showHidePass() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.text = 'password';
    } else {
      this.text = 'text';
    }
  }

  ngOnInit(): void {
    this.showPassword = true;
  }

}
