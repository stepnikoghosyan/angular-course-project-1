import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reset } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(5)]],
  })
  errMessage!: string;
  isTouched = false;
  constructor(private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private routes: Router,
    private notifyService: NotificationService
  ) { }

  resetPassword() {
    if (this.resetForm.valid) {
      const token = this.activeRoute.snapshot.params['token']
      const resetPass = {
        newPassword: this.resetForm.get('newPassword')?.value,
        token: token,
      }
      this.authService.resetPassword(resetPass).subscribe(() => {
        next: () => {
          this.routes.navigateByUrl('/home')
        };
        // error: (err:any) => {
        //   this.notifyService.showError("Error", err.error.)
        // }
      })
    }
  }

  ngOnInit(): void {
  }

}
