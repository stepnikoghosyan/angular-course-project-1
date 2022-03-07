import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPublicGuard } from './auth-public.guard';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostsComponent } from './posts/posts.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UsersComponent } from './users/users.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full', 
    redirectTo: 'login'
  },
  {
    
    path:'login',
    component:LoginComponent,
    canActivate:[AuthPublicGuard]
    
  },
  {
    path:'auth/register',
    component:RegisterComponent,
     canActivate:[AuthPublicGuard]
 
   

  },
  {
    path:'auth/forgotPassword',
    component:ForgotPasswordComponent
  },
  {
    path:'auth/resetPassword',
    component:ResetPasswordComponent
  },
  {
    path:'verify-account/:activationToken',
    component:VerifyAccountComponent,
    canActivate:[AuthPublicGuard]

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
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
