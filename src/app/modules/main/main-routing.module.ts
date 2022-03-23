import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from 'src/app/create-post/create-post.component';
import { EditPostComponent } from 'src/app/edit-post/edit-post.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HomeComponent } from 'src/app/home/home.component';
import { MainComponent } from 'src/app/main/main.component';
import { PostsComponent } from 'src/app/posts/posts.component';
import { UsersComponent } from 'src/app/users/users.component';

const routes: Routes = [
    // {   
    //     path: "main", 
    //     component: HomeComponent,
    
    // },
    {   
        path: "main/home", 
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "posts", 
        component: PostsComponent,
        
        
    },
    {
        path: 'create',
        component: CreatePostComponent,

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
                
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
