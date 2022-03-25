import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from 'src/app/modules/main/components/create-post/create-post.component';
import { EditPostComponent } from 'src/app/modules/main/components/edit-post/edit-post.component';
import { AuthGuard } from '../main/guards/auth.guard';
import { HomeComponent } from 'src/app/modules/main/components/home/home.component';
import { MainComponent } from 'src/app/modules/main/main.component';
import { PostsViewComponent } from 'src/app/modules/main/components/posts/posts-view/posts-view.component';
import { UsersComponent } from 'src/app/modules/main/components/users/users.component';
import { PostsComponent } from './components/posts/posts.component';

const routes: Routes = [
    {   
        path: "", 
        component: MainComponent,
        children: [
            {   
                path: "home", 
                component: HomeComponent,
                canActivate: [AuthGuard]
            },
            {
                path: "posts", 
                component: PostsComponent
            },
            
            {
                path: 'users',
                component: UsersComponent,
                canActivate: [AuthGuard]
            },
        ]
    },
    {
        path: 'create',
        component: CreatePostComponent,

    },
    {
        path: 'edit-post/:id',
        component: EditPostComponent,
    },
    {
        path: 'view-post/:id',
        component: PostsViewComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
