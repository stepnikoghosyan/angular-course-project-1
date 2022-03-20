import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {PostsComponent} from './posts.component';
import {PostsRoutingModule} from './posts-routing.module';
import {PostsAddEditComponent} from './components/posts-add-edit/posts-add-edit.component';
import {PostsViewComponent} from './components/posts-view/posts-view.component';
import {PostCardComponent} from "./components/post-card/post-card.component";
import {PostCardFooterComponent} from "./components/post-card-footer/post-card-footer.component";
import {PostContainerComponent} from "./components/post-container/post-container.component";

@NgModule({
  declarations: [
    PostsComponent,
    PostsAddEditComponent,
    PostsViewComponent,
    PostCardComponent,
    PostCardFooterComponent,
    PostContainerComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule
  ]
})
export class PostsModule { }
