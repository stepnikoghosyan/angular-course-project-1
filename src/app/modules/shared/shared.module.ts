import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoaderComponent } from './ components/loader/loader.component';
import { LoadingSpinnerComponent } from "./ components/loading-spinner/loading-spinner.component";
import { FormsModule } from "@angular/forms";
import { PostCardComponent } from './ components/post-card/post-card.component';
import { PostCardFooterComponent } from './ components/post-card-footer/post-card-footer.component';
import { PostContainerComponent } from './ components/post-container/post-container.component';
import { FullNamePipe } from './pipes/full-name.pipe';
import { ImageUrlPipe } from './pipes/image-url.pipe';

@NgModule({
  declarations: [
    LoaderComponent,
    LoadingSpinnerComponent,
    ImageUrlPipe,
    FullNamePipe,
    PostCardComponent,
    PostCardFooterComponent,
    PostContainerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    LoaderComponent,
    LoadingSpinnerComponent,
    ImageUrlPipe,
    FullNamePipe,
    PostCardComponent,
    PostCardFooterComponent,
    PostContainerComponent
  ]
})
export class SharedModule {
}
