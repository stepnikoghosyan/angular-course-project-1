import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PostsComponent } from './posts.component';
import { PostComponent } from './post/post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from '../header/header.component';
import { CardComponent } from './card/card.component';
import { CardFooterComponent } from './card-footer/card-footer.component';
import { DotsPipe } from '../dots.pipe';




@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    CardComponent,
    CardFooterComponent,
    DotsPipe,],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule
  ]
})
export class PostsModule { }
