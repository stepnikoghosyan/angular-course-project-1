import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UsersComponent } from '../users/users.component';
import { AuthGuard } from '../guards/auth.guard';
import { AuthPublicGuard } from '../guards/auth-public.guard';
import { NotFoundComponent } from '../not-found/not-found.component';
import { MyPostsComponent } from '../my-posts/my-posts.component';
import { PostViewComponent } from '../shared/post-view/post-view.component';
import { ProfileComponent } from '../profile/profile.component';



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
    loadChildren: () => import('../posts/posts.module').then(m => m.PostsModule),
    canLoad: [AuthGuard]

  },
  {
    path: 'post-view/:id',
    component: PostViewComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'my-posts',
    component:MyPostsComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'my-profile',
    component: ProfileComponent,
    canActivate:[AuthGuard]
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
