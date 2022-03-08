import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../auth/register/register.component'
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { VerifyAccountComponent } from '../auth/verify-account/verify-account.component';
import { HomeComponent } from '../home/home.component';
import { PostsComponent } from '../posts/posts.component';
import { UsersComponent } from '../users/users.component';
import { LoginComponent } from '../auth/login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { AuthPublicGuard } from '../guards/auth-public.guard';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CardComponent } from '../posts/card/card.component';
import { CardFooterComponent } from '../posts/card-footer/card-footer.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'auth/login', 
    pathMatch: 'full' 
  },
  {
    path:'auth/register', 
    component:RegisterComponent,
    canActivate: [AuthPublicGuard]
  },
  {
    path:'auth/forgot-password', 
    component: ForgotPasswordComponent,
    canActivate: [AuthPublicGuard]
  },
  {
    path:'auth/reset-password',
    component: ResetPasswordComponent,
    canActivate: [AuthPublicGuard]
  },
  {
    path:'auth/verify-account/:token',
    component: VerifyAccountComponent,
    canActivate: [AuthPublicGuard]
  },
  {
    path:'auth/reset-password/:token', 
    component: ResetPasswordComponent,
    canActivate: [AuthPublicGuard]
  },
  {
    path:'auth/login', 
    component:LoginComponent,
    canActivate: [AuthPublicGuard]
  },
  {
    path:'home', 
    component: HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'users', 
    component: UsersComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'posts', 
    component:PostsComponent,
    canActivate:[AuthGuard]
  },
  // {
  //   path:'posts/card', 
  //   component: CardComponent,
  //   canActivate:[AuthGuard]
  // },
  // {
  //   path:'posts/card-footer', 
  //   component: CardFooterComponent,
  //   canActivate:[AuthGuard]
  // },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
