import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./main.component";
import {HomeComponent} from "./components/home/home.component";
import {PostsComponent} from "./components/posts/posts.component";
import {PostsViewComponent} from "./components/posts-view/posts-view.component";
import {PostsAddEditComponent} from "./components/posts-add-edit/posts-add-edit.component";
import {UsersComponent} from "./components/users/users.component";
import {ProfileComponent} from "./components/profile/profile.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'posts',
        component: PostsComponent,
      },
      {
        path: 'posts/add',
        component: PostsAddEditComponent
      },
      {
        path: 'posts/:id',
        component: PostsViewComponent
      },
      {
        path: 'posts/:id/edit',
        component: PostsAddEditComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
