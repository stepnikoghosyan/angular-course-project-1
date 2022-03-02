import {Component, OnInit} from '@angular/core';
import {finalize, Subject, takeUntil} from "rxjs";
import {NotificationService} from "../services/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {emailValidator} from "../validators/email-validator";

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  emailFormGroup!: FormGroup;
  expandEmailGroup = false;
  isLoading = true;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private notifyService: NotificationService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
    this.initForm();
  }

  ngOnInit(): void {
    this.verifyAccount();
  }

  private initForm() {
    this.emailFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator()]],
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onResendClick(): void {
    this.expandEmailGroup = true;
  }

  onSendEmail(): void {
    if (!this.submitted) {
      this.isLoading = true;
      this.submitted = true;
      this.authService.resendActivationToken(this.emailFormGroup.value.email)
        .pipe(takeUntil(this.unsubscribe$),
          finalize(() => {
            this.isLoading = false;
            this.submitted = false;
          }))
        .subscribe({
          next: () => {
            this.showNotifications(true, "Account verified");
          },
          error: (err) => {
            this.showNotifications(false, err.error.message);
          }
        });
    }
  }

  private verifyAccount() {
    const accessToken = this.activatedRoute.snapshot.params['accessToken'];
    return this.authService.verifyAccount(accessToken)
      .pipe(takeUntil(this.unsubscribe$),
        finalize(() => {
          this.isLoading = false;
        }))
      .subscribe({
        next: () => {
          this.showNotifications(true, "Account verified");
        },
        error: (err) => {
          this.showNotifications(false, err.error.message);
        }
      });
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
