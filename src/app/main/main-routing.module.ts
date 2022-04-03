import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PostViewComponent } from './post-view/post-view.component';
import { UsersComponent } from './users/users.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';

const routes:Routes =[
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'main/post-view/:id',
    component: PostViewComponent,

  },
  {
    path: 'main/my-posts',
    component:MyPostsComponent,
  },
  {
    path: 'main/my-profile',
    component: ProfileComponent,
  },
  {
    path: 'main/posts',
    component:PostsComponent
   
  },

  {
    path: 'post',
    component:PostComponent
  },

  {
    path: 'create',
    component:PostComponent
  },
  {
    path: ':id',
    component:PostComponent
  },


  {
    path: 'users',
    component: UsersComponent,
  
  },
  {
    path: 'home',
    component: HomeComponent,
  },
 
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
