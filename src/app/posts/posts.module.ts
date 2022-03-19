import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsAddEditComponent } from './posts-add-edit/posts-add-edit.component';
import { PostsViewComponent } from './posts-view/posts-view.component';

@NgModule({
  declarations: [
    PostsComponent,
    PostsAddEditComponent,
    PostsViewComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule
  ]
})
export class PostsModule { }