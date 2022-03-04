import { Component } from '@angular/core';
  import { Pages,PageModule } from './module/pages';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'menu';
  notificationMessage:boolean=true;
  //make array for view pages
  pages:PageModule[] = [
    { 
      id:Pages.Auth,
      name:"auth"

  },
  { 
    id:Pages.Home,
    name:"home"

},
{ 
  id:Pages.Posts,
  name:"posts"

},
{ 
  id:Pages.Profile,
  name:"profile"

},
{ 
  id:Pages.Users,
  name:"users"

},


]

}
