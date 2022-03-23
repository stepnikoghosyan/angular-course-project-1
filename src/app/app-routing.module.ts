import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthPublicGuard } from './guards/auth-public.guard';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommentsComponent } from './posts/comments/comments.component';
import { PostsViewComponent } from './posts/posts-view/posts-view.component';
import { PostsComponent } from './posts/posts.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UsersComponent } from './users/users.component';
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
        path: "main", 
        component: MainComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: "home", 
                component: HomeComponent,
                canActivate: [AuthGuard]
            },
            {
                path: "posts", 
                component: PostsComponent,
                canActivate: [AuthGuard],
               
                
            },
            {
                path: 'users',
                component: UsersComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'edit-post/:id',
                component: EditPostComponent,
                
            },
            {
                path: 'create',
                component: CreatePostComponent,
                
            },
            {
                path: 'comments/:id',
                component: CommentsComponent,
                
            },
            {
                path: 'view/:id',
                component: PostsViewComponent,
                
            },

        ]
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
        component: NotFoundComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
