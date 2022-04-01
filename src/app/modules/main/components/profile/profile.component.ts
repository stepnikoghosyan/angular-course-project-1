import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../../services/notification.service";
import {Router} from "@angular/router";
import {emailValidator} from "../../../auth/validators/email-validator";
import {ConfirmedValidator} from "../../../auth/validators/confirmed-validator";
import {UserModel} from "../../models/user.model";
import {UserService} from "../../../../services/user.service";
import {finalize, Subject, takeUntil} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import { fileTypeValidator } from '../../validators/file-type.validator';
import { fileSizeValidator } from '../../validators/file-size.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy{
  private unsubscribe$ = new Subject<void>();
  private readonly FILE_EXTENSIONS = ['image/jpg', 'image/jpeg', 'image/png'];
  private readonly FILE_SIZE_MEGABYTE = 2;

  form!: FormGroup;
  isLoading = false;
  submitted = false;
  user?: UserModel | null;
  defaultImageUrl = 'assets/images/profile_picture.jpg';
  extension: string;
  previewImage = '';
  
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private notifyService: NotificationService) {
    this.formInit();
    this.extension = this.FILE_EXTENSIONS.map(item => ('.' + item.split('/').pop()).toLowerCase()).join(', ');
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.patchForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private formInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [''],
      profilePicture:[null, [fileTypeValidator(this.FILE_EXTENSIONS), fileSizeValidator(this.FILE_SIZE_MEGABYTE)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required]],
    },
      {
        validators: ConfirmedValidator('password','confirm_password')
      });
  }

  private patchForm(): void {
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
        this.previewImage = this.user.profilePictureUrl;
      }
    }
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
              this.userService.getUserProfile()
              .pipe(takeUntil(this.unsubscribe$))
               .subscribe(data=> {
                this.user = data;
                this.patchForm();
                this.userService.pictureChanged.next(data);
              });
            },
            error: (err: HttpErrorResponse) => {
              this.notifyService.showNotification(false, err.error.message);
            }
          });
      }
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.form.controls['profilePicture'].setValue(file);
    }
    if (this.form.controls['profilePicture'].invalid) {
      this.deleteImageProperty();
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
      }
      reader.readAsDataURL(file)
    }
  }

  onDeleteImage(): void {
    this.form.controls['profilePicture'].reset();
    this.form.controls['profilePicture'].setValue(this.defaultImageUrl);
    this.previewImage = this.defaultImageUrl
  }

  private deleteImageProperty(): void {
    this.previewImage = this.defaultImageUrl;
  }

}
