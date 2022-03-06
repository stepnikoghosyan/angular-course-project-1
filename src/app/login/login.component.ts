import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginDto} from "../models/auth.model";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../services/notification.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {finalize, Subject, takeUntil} from "rxjs";
import {emailValidator} from "../validators/email-validator";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  private unsubscribe$ = new Subject<void>();
  form!: FormGroup;
  isLoading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private notifyService: NotificationService,
              private router: Router) {
    this.formInit();
  }

  private formInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: ['']
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit(): void {
    if (this.submitted) {
      return;
    } else {
      if (this.form.valid) {
        const dto = new LoginDto(this.form.value);
        this.isLoading = true;
        this.submitted = true;
        this.authService.login(dto, this.form.controls['remember'].value)
          .pipe(takeUntil(this.unsubscribe$),
            finalize(() => {
              this.isLoading = false;
              this.submitted = false;
            }))
          .subscribe({
            error: (err: HttpErrorResponse) => {
              this.showNotifications(false, err.error.message)
            }, next: () => {
              this.showNotifications(true, "Successfully logged in.");
            }
          })
      }
    }
  }

  private showNotifications(success: boolean, message: string): void {
    if (success) {
      this.notifyService.showSuccess("Success", message);
      this.router.navigateByUrl('/home');
    } else {
      this.notifyService.showError("Error", message);
    }
  }

}
