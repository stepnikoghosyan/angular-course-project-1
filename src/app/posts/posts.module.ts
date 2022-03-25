import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PostsComponent } from './posts.component';
import { PostComponent } from './post/post.component';



@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule
  ],
  
})
export class PostsModule { }
