import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoaderComponent } from './loader/loader.component';
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PasswordComponent } from './password/password.component';
import { FormsModule } from "@angular/forms";
import { PostCardComponent } from './posts/post-card/post-card.component';
import { PostCardFooterComponent } from './posts/post-card-footer/post-card-footer.component';
import { ImageUrlPipe } from './pipes/image-url.pipe';
import { FullNamePipe } from './pipes/full-name.pipe';
import { PostContainerComponent } from './posts/post-container/post-container.component';

@NgModule({
  declarations: [
    LoaderComponent,
    LoadingSpinnerComponent,
    PasswordComponent,
    PostCardComponent,
    PostCardFooterComponent,
    PostContainerComponent,
    ImageUrlPipe,
    FullNamePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    LoaderComponent,
    LoadingSpinnerComponent,
    PasswordComponent,
    PostCardComponent,
    PostCardFooterComponent,
    PostContainerComponent,
    ImageUrlPipe,
    FullNamePipe
  ]
})
export class SharedModule {
}
