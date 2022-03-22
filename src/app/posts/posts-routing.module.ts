import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: 'post',
    component:PostComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostsRoutingModule { }
