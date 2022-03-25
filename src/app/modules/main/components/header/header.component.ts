import { Component, OnInit } from '@angular/core';
import { INavItem } from '../../../../models/nav-item.model';
import { getNavigationItems } from '../../configs/navigation-Items.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navItems!: INavItem[];

  constructor() {}

  ngOnInit(): void {
      this.navItems = getNavigationItems();
      console.log("NAVITEMS", this.navItems)
  }
}
