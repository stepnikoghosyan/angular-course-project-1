import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PostsComponent} from './posts.component';
import {PostsRoutingModule} from './posts-routing.module';
import {PostsAddEditComponent} from './components/posts-add-edit/posts-add-edit.component';
import {PostsViewComponent} from './components/posts-view/posts-view.component';
import {PostCardModule} from "../post-card/post-card.module";
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PostsComponent,
    PostsAddEditComponent,
    PostsViewComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    PostCardModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class PostsModule { }
