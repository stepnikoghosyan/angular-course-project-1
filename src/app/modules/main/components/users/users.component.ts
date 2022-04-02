import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, finalize, map, Observable } from 'rxjs';
import { GetUserModel } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    showSpinner = false;
    users$?: Observable<GetUserModel[]>;


    filterForm = this.formBuilder.group({
        name: ['']
    });

    constructor(private userService: UsersService,
        private formBuilder: FormBuilder,
        private router: Router) { }

    ngOnInit(): void {
        this.showSpinner = true
        this.users$ = this.userService.getUsers().pipe(
            finalize(() => {
                this.showSpinner = false
            }),
            map(data => data.results)
        )

        this.filterForm.valueChanges.pipe(
            debounceTime(300)
        ).subscribe({
            next: (filterdValue) => {
                this.users$ = this.userService.getUsers(filterdValue.name).pipe(
                    map(data => data.results)
                )
            }
        })
    }

    filterUsers() {
        this.users$ = this.userService.getUsers(this.filterForm.controls['name'].value)
        .pipe(
            map(data => data.results))
    }
}
