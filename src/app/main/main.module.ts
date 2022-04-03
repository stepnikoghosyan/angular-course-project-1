import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostViewComponent } from './post-view/post-view.component';
import { DotsPipe } from './dots.pipe';
import { CardFooterComponent } from './card-footer/card-footer.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { UserCardComponent } from './users/user-card/user-card.component';
import { ProfileComponent } from './profile/profile.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { LoadingModule } from '../loading/loading.module';



@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    ProfileComponent,
    MainComponent,
    HomeComponent,
    HeaderComponent,
    CardComponent,
    PostViewComponent,
    DotsPipe ,
    CardFooterComponent,
    CommentsComponent,
    CommentCardComponent,
    UsersComponent,
    UserCardComponent,
    MyPostsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FontAwesomeModule ,
    ReactiveFormsModule,
    LoadingModule
  ]
})
export class MainModule { }
