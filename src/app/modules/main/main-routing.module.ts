import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from 'src/app/modules/main/components/create-post/create-post.component';
import { EditPostComponent } from 'src/app/modules/main/components/edit-post/edit-post.component';
import { HomeComponent } from 'src/app/modules/main/components/home/home.component';
import { MainComponent } from 'src/app/modules/main/main.component';
import { PostsViewComponent } from 'src/app/modules/main/components/posts/posts-view/posts-view.component';
import { UsersComponent } from 'src/app/modules/main/components/users/users.component';
import { PostsComponent } from './components/posts/posts.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { CommentsComponent } from './components/posts/comments/comments.component';

const routes: Routes = [
    {
        path: "",
        component: MainComponent,
        children: [
            {
                path: "home",
                component: HomeComponent,
            },
            {
                path: "posts",
                component: PostsComponent,                  
            },
            {
                path: 'posts/create',
                component: CreatePostComponent,
        
            },
            {
                path: "posts/:id",
                component:PostsViewComponent
            },
           
            {
                path: 'posts/:id/edit',
                component: EditPostComponent,
            },
            {
                path: 'users',
                component: UsersComponent,
            },
            {
                path: 'profile-settings',
                component: ProfileSettingsComponent,
            },
        ]
    },
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
