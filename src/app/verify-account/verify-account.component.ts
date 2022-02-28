import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from '../services/notification.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, switchMap, take} from "rxjs";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {

  emailFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    })
  });

  public validationErrors: Map<string, string> = new Map();
  public expandEmailGroup: boolean = false;
  public showLoader: boolean = true;

  constructor(private notifyService: NotificationService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
    this.validationErrors.set('required', 'Email is required')
    this.validationErrors.set('email', 'Invalid email address.')
  }

  ngOnInit(): void {
    this.verifyAccount()
      .subscribe(_ => {
        this.showNotifications(true);
      }, (err => {
        this.showNotifications(false, err.error.message);
      }));
  }

  onResendClick(): void {
    this.expandEmailGroup = true;
  }

  onSendEmail(): void {
    this.showLoader = true;
    this.authService.resendActivationToken(this.emailFormGroup.value.email)
      .pipe(
        take(1))
      .subscribe(_ => {
        this.showNotifications(true);
      }, (err => {
        this.showNotifications(false, err.error.message);
      }));
  }

  isMailInvalid(): boolean {
    return this.emailFormGroup.controls['email'].invalid &&
      (this.emailFormGroup.controls['email'].touched || this.emailFormGroup.controls['email'].dirty);
  }

  getValidationError(): any[] {
    let validations = [];
    for (let key in this.emailFormGroup.controls['email'].errors) {
      validations.push(this.validationErrors.get(key));
    }
    return validations;
  }

  private verifyAccount(): Observable<any> {
    return this.activatedRoute.params.pipe(take(1), switchMap(params =>
      this.authService.verifyAccount(params['access-token'])
        .pipe(take(1))));
  }

  private showNotifications(success: boolean, errorMessage?: string): void {
    this.showLoader = false;
    if (success) {
      this.notifyService.showSuccess("Success", "Account verified");
      this.router.navigateByUrl('/login');
    } else {
      this.notifyService.showError("Error", errorMessage!);
    }
  }
}
