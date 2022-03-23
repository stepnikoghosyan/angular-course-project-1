import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./components/main/main.component";
import {AuthPublicGuard} from "./guards/auth-public.guard";
import {AuthGuard} from "./guards/auth.guard";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    canLoad: [AuthPublicGuard],
    canActivate: [AuthPublicGuard]
  },
  {
    path: '',
    component: MainComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'posts',
        loadChildren: () => import('./modules/posts/posts.module').then(m => m.PostsModule),
      },
      {
        path: 'my-posts',
        loadChildren: () => import('./modules/my-posts/my-posts.module').then(m => m.MyPostsModule),
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
