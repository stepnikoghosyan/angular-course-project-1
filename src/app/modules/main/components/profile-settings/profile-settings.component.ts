import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ConfirmPasswordValidator } from '../../customValidators/confirmPasswordValidator';
import { GetUserModel } from '../../models/user.model';
import { UsersService } from '../../services/users.service';


@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {
    private subscription$ = new Subject<void>();
    errors: string[] = [];
    showSpinner = false;
    showEyeIcon = false;
    showConfirmEyeIcon = false;
    myProfileInfo!: GetUserModel;
    targetValue!: any;
    file?: File;

    settingsForm: FormGroup = this.formBuilder.group({
        profilePicture: [''],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
    },
        {
            validators: [ConfirmPasswordValidator.mustMatch('password', 'confirmPassword')]
        });

    constructor(
        private formBuilder: FormBuilder,
        private usersService: UsersService) { }

    get form() {
        return this.settingsForm.controls;
    }

    ngOnInit(): void {
        this.usersService.getMyProfile().pipe(
            takeUntil(this.subscription$),
            finalize(() =>
                this.showSpinner = false))
            .subscribe({
                next: (data) => {
                    this.myProfileInfo = data;
                    console.log("my profile", this.myProfileInfo);

                    this.form['firstName'].setValue(this.myProfileInfo.firstName);
                    this.form['lastName'].setValue(this.myProfileInfo?.lastName);
                    this.form['email'].setValue(this.myProfileInfo?.email);
                    this.form['profilePicture'].setValue(this.myProfileInfo?.profilePictureUrl);
                    this.targetValue = this.myProfileInfo.profilePictureUrl;
                }
            })
    };

    settingsFormSubmit() {
        if (this.settingsForm.valid) {
            this.usersService.putMyProfileInfo(this.settingsForm).pipe(
                finalize(() => {
                    this.showSpinner = false;
                }))
                .subscribe({
                    next: () => {
                        console.log("updated");
                        this.form['password'].reset();
                        this.form['confirmPassword'].reset()
                    },
                })
        }
    };

    onSelectFile(files: any) {
        if (files.length === 0)
            return;

        let mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }
        this.file = <File>files[0];
        this.form['profilePicture'].patchValue(this.file);

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.targetValue = reader.result; //// ???????????????????????????/
        }
        console.log("reader", this.form['profilePicture'].value);
    }

    onImageError(): void {
        this.targetValue = "../../assets/images/user_image.jpg"
    }

    clearImg() {
        this.targetValue = "../../assets/images/user_image.jpg";
        this.form['profilePicture'].reset();
        this.form['profilePicture'].disable();
    };

    toggleShowPassoword() {
        this.showEyeIcon = !this.showEyeIcon;
    };

    toggleShowConfirmPassoword() {
        this.showConfirmEyeIcon = !this.showConfirmEyeIcon;
    }

    ngOnDestroy(): void {
        this.subscription$.next()
        this.subscription$.complete()
    }
}
