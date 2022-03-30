import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../../services/notification.service";
import {Router} from "@angular/router";
import {emailValidator} from "../../../auth/validators/email-validator";
import {ConfirmedValidator} from "../../../auth/validators/confirmed-validator";
import {UserModel} from "../../models/user.model";
import {UserService} from "../../../../services/user.service";
import {finalize, Subject, takeUntil} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  private unsubscribe$ = new Subject<void>();

  form!: FormGroup;
  isLoading = false;
  submitted = false;
  user?: UserModel | null;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private notifyService: NotificationService,
              private router: Router) {
    this.formInit();
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    if(this.user){
      this.form.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email
      });
      if (this.user.profilePictureUrl) {
        this.form.patchValue({
          profilePicture: this.user.profilePictureUrl,
        });
      }
    }
  }

  private formInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, emailValidator()]],
      profilePicture:[''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required]],
    },
      {
        validators: ConfirmedValidator('password','confirm_password')
      });
  }

  onSubmit(): void {
    if (this.submitted) {
      return;
    } else {
      if (this.form.valid) {
        this.isLoading = true;
        this.submitted = true;
        this.userService.updateProfile(this.form.value)
          .pipe(takeUntil(this.unsubscribe$),
            finalize(() => {
              this.isLoading = false;
              this.submitted = false;
            }))
          .subscribe({
            next: () => {
              this.notifyService.showNotification(true, "Successfully updated.", null, ['profile'])
            },
            error: (err: HttpErrorResponse) => {
              this.notifyService.showNotification(false, err.error.message);
            }
          });
      }
    }
  }
}
