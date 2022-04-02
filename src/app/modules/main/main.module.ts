import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

// import { MultilineDirective } from 'src/app/directives/multiline.directive';
import { HeaderComponent } from 'src/app/modules/main/components/header/header.component';
import { UsersComponent } from 'src/app/modules/main/components/users/users.component';
import { PostCardComponent } from 'src/app/modules/main/components/posts/post-card/post-card.component';
import { CardFooterComponent } from 'src/app/modules/main/components/posts/card-footer/card-footer.component';
import { UserNamePipe } from 'src/app/modules/main/pipes/user-name.pipe';
import { EditPostComponent } from 'src/app/modules/main/components/edit-post/edit-post.component';
import { HomeComponent } from 'src/app/modules/main/components/home/home.component';
import { MainComponent } from 'src/app/modules/main/main.component';
import { PostsViewComponent } from 'src/app/modules/main/components/posts/posts-view/posts-view.component';

import { SetImagePipe } from 'src/app/modules/main/pipes/set-image.pipe';
import { CreatePostComponent } from 'src/app/modules/main/components/create-post/create-post.component';
import { CommentsComponent } from './components/posts/comments/comments.component';
import { PostsComponent } from 'src/app/modules/main/components/posts/posts.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { SetUserImagePipe } from './pipes/set-user-image.pipe';
import { SetCommentImagePipe } from './pipes/set-comment-image.pipe';
import { UserCardComponent } from './components/users/user-card/user-card.component';

@NgModule({
    declarations: [
        HeaderComponent,
        UsersComponent,
        PostCardComponent,
        CardFooterComponent,
        UserNamePipe,
        EditPostComponent,
        SetImagePipe,
        CreatePostComponent,
        HomeComponent,
        MainComponent,
        PostsViewComponent,
        CommentsComponent,
        PostsComponent,
        ProfileSettingsComponent,
        SetUserImagePipe,
        SetCommentImagePipe,
        UserCardComponent,
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        ReactiveFormsModule,
        MatIconModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule
    ]
})
export class MainModule { }
