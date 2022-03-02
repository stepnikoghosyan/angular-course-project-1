import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },

    {
        path: "auth/verify-account/:activationToken",
        component: VerifyAccountComponent
    },
    {
        path: "home", 
        component: HomeComponent 
    },
    {
        path:"login",
        component: LoginComponent 
    },
    { 
        path: "register",
        component: RegisterComponent 
    },
    {
        path: "forgot-password",
        component: ForgotPasswordComponent
    },
    {
        path: "auth/reset-password/:activationToken",
        component: ResetPasswordComponent
    }
    
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
