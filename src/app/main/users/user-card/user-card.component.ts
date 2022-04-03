import { Component, Input, OnInit } from '@angular/core';
import { UserModelDto } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input()user?:UserModelDto
  constructor() { }

  ngOnInit(): void {
  }

}
