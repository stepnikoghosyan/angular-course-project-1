import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../../services/notification.service";
import {ConfirmedValidator} from "../../../auth/validators/confirmed-validator";
import {UserModel} from "../../models/user.model";
import {UserService} from "../../../../services/user.service";
import {catchError, finalize, of, Subject, switchMap, takeUntil} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {fileTypeValidator} from '../../validators/file-type.validator';
import {fileSizeValidator} from '../../validators/file-size.validator';
import {defaultImageUrl, FILE_EXTENSIONS, FILE_SIZE_MEGABYTE} from "../../helpers/utils";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  form!: FormGroup;
  isLoading = false;
  submitted = false;
  user?: UserModel | null;
  extension: string;
  previewImage = '';

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private notifyService: NotificationService) {
    this.formInit();
    this.extension = FILE_EXTENSIONS.map(item => ('.' + item.split('/').pop()).toLowerCase()).join(', ');
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
        profilePicture: [null, [fileTypeValidator(FILE_EXTENSIONS), fileSizeValidator(FILE_SIZE_MEGABYTE)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', [Validators.required]],
      },
      {
        validators: ConfirmedValidator('password', 'confirm_password')
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
          .pipe(
            takeUntil(this.unsubscribe$),
            finalize(() => {
              this.isLoading = false;
              this.submitted = false;
            }),
            switchMap(() => {
              return this.userService.getUserProfile()
            }),
            catchError((err: HttpErrorResponse) => {
              this.notifyService.showError(err.error.message);
              return of(null);
            })
          )
          .subscribe(data => {
            this.user = data;
            this.userService.pictureChanged.next(data);
            this.notifyService.showSuccess('Your changes have been successfully saved!')
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
      this.onDeleteImage();
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
    this.previewImage = defaultImageUrl;
  }

}
