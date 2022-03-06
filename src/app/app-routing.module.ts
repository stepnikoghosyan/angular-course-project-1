import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthPublicGuard } from './guards/auth-public.guard';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: "auth/verify-account/:activationToken",
        component: VerifyAccountComponent,
        canActivate: [AuthPublicGuard]
    },
    {
        path: "home", 
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path:"login",
        component: LoginComponent,
        canActivate: [AuthPublicGuard]
    },
    { 
        path: "register",
        component: RegisterComponent,
        canActivate: [AuthPublicGuard]
    },
    {
        path: "forgot-password",
        component: ForgotPasswordComponent,
        canActivate: [AuthPublicGuard]
    },
    {
        path: "auth/reset-password/:activationToken",
        component: ResetPasswordComponent,
        canActivate: [AuthPublicGuard]
    }, 
    {
        path:"**",
        component:NotFoundComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
