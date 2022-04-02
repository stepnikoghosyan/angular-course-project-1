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

    get controls() {
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

                    this.settingsForm.controls['firstName'].setValue(this.myProfileInfo.firstName);
                    this.settingsForm.controls['lastName'].setValue(this.myProfileInfo?.lastName);
                    this.settingsForm.controls['email'].setValue(this.myProfileInfo?.email);
                    this.settingsForm.controls['profilePicture'].setValue(this.myProfileInfo?.profilePictureUrl);
                    this.targetValue = this.myProfileInfo.profilePictureUrl;
                    console.log("my profile image", this.myProfileInfo.profilePictureUrl);
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
                        this.settingsForm.controls['password'].reset();
                        this.settingsForm.controls['confirmPassword'].reset()
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
        this.settingsForm.controls['profilePicture'].patchValue(this.file);

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.targetValue = reader.result; //// ???????????????????????????/
        }
        console.log("reader", this.settingsForm.controls['profilePicture'].value);
    }

    onImageError(): void {
        this.targetValue = "../../assets/images/user_image.jpg"
    }

    clearImg() {
        console.log("pix");
        this.targetValue= "../../assets/images/user_image.jpg";
        this.settingsForm.controls['profilePicture'].reset();
        this.settingsForm.controls['profilePicture'].disable();
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
