import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPostsComponent } from './my-posts.component';
import { MyPostsRoutingModule } from './my-posts-routing.module';
import { SharedModule } from '../shared.module';



@NgModule({
  declarations: [
    MyPostsComponent
  ],
  imports: [
    CommonModule,
    MyPostsRoutingModule,
    SharedModule
  ]
})
export class MyPostsModule { }
