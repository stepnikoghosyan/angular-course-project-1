import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./components/home/home.component";
import {PostsComponent} from "./components/posts/posts.component";
import {PostsAddEditComponent} from "./components/posts-add-edit/posts-add-edit.component";
import {PostsViewComponent} from "./components/posts-view/posts-view.component";
import {PostCardComponent} from "./components/post-card/post-card.component";
import {PostCardFooterComponent} from "./components/post-card-footer/post-card-footer.component";
import {PostContainerComponent} from "./components/post-container/post-container.component";
import {MyPostsComponent} from "./components/my-posts/my-posts.component";
import {MainRoutingModule} from "./main-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {LoaderModule} from "../loader/loader.module";
import {PipesModule} from "../pipes/pipes.module";
import {PostsService} from "./services/posts.service";
import {MainComponent} from "./main.component";
import {HeaderComponent} from "./components/header/header.component";
import {UsersComponent} from "./components/users/users.component";
import {UsersService} from "./services/users.service";
import {UserCardComponent} from "./components/user-card/user-card.component";
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { SendMessageComponent } from './components/send-message/send-message.component';
import { CommentsService } from "./services/comments.service";
import {ProfileComponent} from "./components/profile/profile.component";

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    HomeComponent,
    PostsComponent,
    PostsAddEditComponent,
    PostsViewComponent,
    PostCardComponent,
    PostCardFooterComponent,
    PostContainerComponent,
    MyPostsComponent,
    UsersComponent,
    UserCardComponent,
    CommentItemComponent,
    SendMessageComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainRoutingModule,
    LoaderModule,
    PipesModule
  ],
  providers: [
    PostsService,
    UsersService,
    CommentsService
  ]
})
export class MainModule {
}
