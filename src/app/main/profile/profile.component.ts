import { Component, OnInit } from '@angular/core';
import { faEdit, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatchingValidator } from './matching-validator';
import { UsersService } from '../users/users.service';
import { UserModelDto } from 'src/app/models/user.model';
import { NotificationService } from 'src/app/notification-service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  faEdit = faEdit;
  faCircleXmark = faCircleXmark;
  img = ''
  isLoading = false;
  showPassword = true;
  inputType = 'password';
  form: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6),]],
    profilePictureUrl: [null]

  },
    {
      validators: MatchingValidator.mustMatch('password', 'confirmPassword')
    }
  )

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private notifyService: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.getProfileData();
    this.getImg();
  }

  getImg() {
    this.img = this.userService.currentProfile?.profilePictureUrl || 'assets/default.png'
  }

  getProfileData() {
    this.form.patchValue({
      firstName: this.userService.currentProfile?.firstName,
      lastName: this.userService.currentProfile?.lastName,
      email: this.userService.currentProfile?.email,
      profilePictureUrl: this.userService.currentProfile?.profilePictureUrl
    })
  }

  public fileUpload(event: any): void {
    const file = event?.target?.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.img = reader.result as string;
    }

    reader.readAsDataURL(file);
    if (file) {
      this.form?.get('profilePictureUrl')?.setValue(file)
    }

  }

  public clickOnFile(file: any): void {
    file.click()
  }

  deleteImg() {
    this.form.controls['profilePictureUrl'].reset();
    this.getImg()
  }


  update() {
    const userPut = new UserModelDto(this.form.value)
    userPut.id = this.userService.currentProfile!.id
    if (this.form.valid) {
      this.isLoading = true;
      this.userService.putUsers(userPut)
        .subscribe({
          next: () => {
            this.notifyService.showSuccess('The changes were successful', 'Success')
            this.isLoading = false;

          },
          error: (error: HttpErrorResponse) => {
            this.notifyService.showError(error.error.message, 'Error');
          }
        })
    }else{
      this.notifyService.showError('fill in all the fields', 'Error');
    }
  }

  showHidePass(){
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.inputType = 'password';
    } else {
      this.inputType = 'text';
    }
  }
}
