import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {VerifyAccountComponent} from "./components/verify-account/verify-account.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {PasswordComponent} from "../form-components/ components/password/password.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthComponent} from "./auth.component";
import {LoaderModule} from "../loader/loader.module";
import {EmailComponent} from "../form-components/ components/email/email.component";
import {FormComponentsModule} from "../form-components/form-components.module";

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        ResetPasswordComponent,
        VerifyAccountComponent,
        ForgotPasswordComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AuthRoutingModule,
        LoaderModule,
        FormComponentsModule
    ]
})
export class AuthModule {
}
