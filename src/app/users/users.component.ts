import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass
  constructor() { }

  ngOnInit(): void {
  }

}
