import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
    errors: string[] = [];
    showSpinner = false;
    showEyeIcon = true;
    settingsForm: FormGroup = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
    })

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {}

    settingsFormSubmit(){

    }
    toggleShowPassoword(){
        this.showEyeIcon = !this.showEyeIcon;
    };
}
