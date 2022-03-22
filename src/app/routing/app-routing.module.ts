import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { RegisterComponent } from '../auth/register/register.component'
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
import { PostComponent } from '../posts/post/post.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },

  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule),
    canLoad: [AuthPublicGuard]
  },
  
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'posts',
    component: PostsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post',
    component: PostComponent,
    canActivate: [AuthGuard]
  },
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
