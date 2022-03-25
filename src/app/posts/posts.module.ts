import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PostsComponent } from './posts.component';
import { PostComponent } from './post/post.component';
import { PostViewComponent } from './post-view/post-view.component';


@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    PostViewComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule
  ],
  
})
export class PostsModule { }
