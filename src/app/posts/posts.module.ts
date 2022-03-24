import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PostsComponent } from './posts.component';
import { PostComponent } from './post/post.component';
import { CardComponent } from './card/card.component';
import { CardFooterComponent } from './card-footer/card-footer.component';
import { DotsPipe } from '../dots.pipe';
import { PostViewComponent } from './post-view/post-view.component';


@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    CardComponent,
    CardFooterComponent,
    DotsPipe,
    PostViewComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule
  ],
  
})
export class PostsModule { }
