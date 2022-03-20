import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostsComponent} from "./posts.component";
import {PostsViewComponent} from "./components/posts-view/posts-view.component";
import {PostsAddEditComponent} from "./components/posts-add-edit/posts-add-edit.component";

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    children: [
      {
        path: 'view/:id',
        component: PostsViewComponent
      },
      {
        path: 'add',
        component: PostsAddEditComponent
      },
      {
        path: ':id',
        component: PostsAddEditComponent
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostsRoutingModule { }
