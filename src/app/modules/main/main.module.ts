import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

// import { MultilineDirective } from 'src/app/directives/multiline.directive';
import { HeaderComponent } from 'src/app/header/header.component';
import { UsersComponent } from 'src/app/users/users.component';
import { PostCardComponent } from 'src/app/posts/post-card/post-card.component';
import { CardFooterComponent } from 'src/app/posts/card-footer/card-footer.component';
import { UserNamePipe } from 'src/app/pipes/user-name.pipe';
import { EditPostComponent } from 'src/app/edit-post/edit-post.component';
import { PostsComponent } from 'src/app/posts/posts.component';
import { HomeComponent } from 'src/app/home/home.component';
import { MainComponent } from 'src/app/main/main.component';


import { SetImagePipe } from 'src/app/pipes/set-image.pipe';
import { CreatePostComponent } from 'src/app/create-post/create-post.component';


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
    PostsComponent,
    HomeComponent,
    MainComponent

],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ]
})
export class MainModule { }
