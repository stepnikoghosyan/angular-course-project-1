import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { UsersService } from './services/users.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    
    constructor(private usersService: UsersService) { }
    
    ngOnInit(): void {}
}
