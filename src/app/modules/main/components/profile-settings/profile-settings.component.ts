import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { ConfirmPasswordValidator } from '../../customValidators/confirmPasswordValidator';
import { UserModel } from '../../models/user.model';
import { UsersService } from '../../services/users.service';


@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
    errors: string[] = [];
    showSpinner = false;
    showEyeIcon = false;
    showConfirmEyeIcon = false;
    myProfileInfo!: UserModel;
    targetValue!: any;

    settingsForm: FormGroup = this.formBuilder.group({
        profilePicture: [''],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],

    })

    constructor(private formBuilder: FormBuilder,
        private usersService: UsersService) { }

    get controls() {
        return this.settingsForm.controls;
    }

    ngOnInit(): void {
        // console.log("my profile info", this.myProfileInfo, this.usersService.myProfile?.firstName);
        this.usersService.getMyProfile().subscribe({
            next: (data) => {
                this.myProfileInfo = data;
                console.log("my profile", this.myProfileInfo);

                this.settingsForm.controls['firstName'].setValue(this.myProfileInfo.firstName);
                this.settingsForm.controls['lastName'].setValue(this.myProfileInfo?.lastName);
                this.settingsForm.controls['email'].setValue(this.myProfileInfo?.email);
                this.targetValue = this.myProfileInfo.profilePicture;
            }
        })
    }

    settingsFormSubmit() {
        if (this.settingsForm.valid) {
            this.usersService.putMyProfile(this.settingsForm).pipe(
                finalize(() => {
                    this.showSpinner = false;
                }))
                .subscribe({
                    next: () => {

                        console.log("updated");
                        this.settingsForm.controls['password'].reset();
                    },
                })
        }
    }

    onSelectFile(files: any) {
        if (files.length === 0)
            return;

        let mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.targetValue = reader.result;
            this.settingsForm.controls['profilePicture'].patchValue(this.targetValue);
            console.log("reader", this.settingsForm.controls['profilePicture'].value);

        }
    }

    clearImg() {
        this.settingsForm.controls['profilePicture'].reset();
    };

    toggleShowPassoword() {
        this.showEyeIcon = !this.showEyeIcon;
    };

    toggleShowConfirmPassoword() {
        this.showConfirmEyeIcon = !this.showConfirmEyeIcon;
    }
}
