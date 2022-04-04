import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PostViewComponent } from './post-view/post-view.component';
import { UsersComponent } from './users/users.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
      },

      {
        path: 'post-view/:id',
        component: PostViewComponent,

      },
      {
        path: 'my-posts',
        component: MyPostsComponent,
      },
      {
        path: 'my-profile',
        component: ProfileComponent,
      },
      {
        path: 'posts',
        component: PostsComponent

      },

      // {
      //   path: 'post',
      //   component: PostComponent
      // },

      {
        path: 'posts/create',
        component: PostComponent
      },
      {
        path: 'posts/:id',
        component: PostComponent
      },


      {
        path: 'users',
        component: UsersComponent,

      },
    
    ]
  },


]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
