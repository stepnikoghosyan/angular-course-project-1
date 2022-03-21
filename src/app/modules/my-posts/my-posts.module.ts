import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyPostsComponent} from './my-posts.component';
import {MyPostsRoutingModule} from './my-posts-routing.module';
import {SharedModule} from '../shared/shared.module';
import {PostCardModule} from "../post-card/post-card.module";

@NgModule({
  declarations: [
    MyPostsComponent
  ],
  imports: [
    CommonModule,
    MyPostsRoutingModule,
    PostCardModule
  ]
})
export class MyPostsModule { }
