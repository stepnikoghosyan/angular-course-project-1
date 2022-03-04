import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PostsComponent } from './posts/posts.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UsersComponent } from './users/users.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix', //default
    redirectTo: 'app'
  },
  {
    
    path:'auth/login',
    component:LoginComponent,
    
  },
  {
    path:'auth/register',
    component:RegisterComponent,
 
   
    
  },
  {
    path:'forgotPassword',
    component:ForgotPasswordComponent
  },
  {
    path:'auth/resetPassword',
    component:ResetPasswordComponent
  },
  {
    path:'auth/verifysAccountsword',
    component:VerifyAccountComponent
  },
  {
    path:'auth',
    component:AuthComponent
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'posts',
    component:PostsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'users',
    component:UsersComponent,
    canActivate:[AuthGuard]
  },

  {
    path:'profile',
    component:ProfileComponent,
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
