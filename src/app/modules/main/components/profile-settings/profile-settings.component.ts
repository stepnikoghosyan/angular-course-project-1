import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    myProfileInfo?: UserModel;

    settingsForm: FormGroup = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        // ConfirmPasswordValidator('password', 'confirmPassword')]]

    }, {
        validator: ConfirmPasswordValidator.mustMatch('password', 'confirmPassword')
    })

    constructor(private formBuilder: FormBuilder,
        private usersService: UsersService) { }

    get controls() {
        return this.settingsForm.controls;
    }

    ngOnInit(): void {
        this.usersService.getMyProfile().subscribe({
            next: (data) => {
                this.myProfileInfo = data;
                this.settingsForm.controls['firstName'].patchValue(data.firstName);
                this.settingsForm.controls['lastName'].patchValue(data.lastName);
                this.settingsForm.controls['email'].patchValue(data.email);
            }
        })
    }


    settingsFormSubmit() {}
    clearImg(){}
    
    toggleShowPassoword() {
        this.showEyeIcon = !this.showEyeIcon;
    };
    
    toggleShowConfirmPassoword() {
        this.showConfirmEyeIcon = !this.showConfirmEyeIcon;
    }
}
