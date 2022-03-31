import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UsersComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass
  constructor() { }

  ngOnInit(): void {
  }

}
