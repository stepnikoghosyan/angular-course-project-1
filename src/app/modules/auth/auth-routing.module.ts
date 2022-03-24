import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgotPasswordComponent } from 'src/app/forgot-password/forgot-password.component';
import { LoginComponent } from 'src/app/login/login.component';
import { NotFoundComponent } from 'src/app/not-found/not-found.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { ResetPasswordComponent } from 'src/app/reset-password/reset-password.component';
import { VerifyAccountComponent } from 'src/app/verify-account/verify-account.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
    
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: '',
                redirectTo: "login",
                pathMatch: "full"
            },
            {
                path: 'login',
                component: LoginComponent
            },
            { 
                path: "register",
                component: RegisterComponent,
            },
            {
                path: "forgot-password",
                component: ForgotPasswordComponent,
            },
            {
                path: "auth/reset-password/:activationToken",
                component: ResetPasswordComponent,
            },
            {
                path: "auth/verify-account/:activationToken",
                component: VerifyAccountComponent,
            }
        ]
    },
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
