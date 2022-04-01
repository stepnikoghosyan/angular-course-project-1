import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, finalize, map, Observable, Subscription, tap } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  // users : any
  subscription? :Subscription
  showSpinner = false
  users$? :Observable<UserModel[]>

  filterForm = this.formBuilder.group({
    name : ['']
  })
  

  constructor(private userService :UsersService,
              private formBuilder :FormBuilder,
              private router :Router) { }

  // ngOnInit(): void {
  //   this.showSpinner = true
  //   this.userService.getUsers().pipe(
  //     finalize(()=>{
  //       this.showSpinner=false
  //     }),
  //     map(data=>this.users=data.results)
  //   ).subscribe()

    ngOnInit(): void {
    this.showSpinner = true
    this.users$ = this.userService.getUsers().pipe(
      finalize(()=>{
        this.showSpinner=false
      }),
      map(data =>data.results)
    )


  //   this.filterForm.valueChanges.pipe(
  //     debounceTime(300)
  //     ).subscribe({
  //       next:(filterValue) =>{
  //         this.userService.getUsers(filterValue.name).subscribe({
  //           next :(response) => {
  //             this.users = response.results
  //             console.log(response); 
  //           }
  //         })
  //       }
  //     })

  this.filterForm.valueChanges.pipe(
    debounceTime(300)
  ).subscribe({
    next:(filterdValue) =>{
      this.users$ = this.userService.getUsers(filterdValue.name).pipe(
        map(data=>data.results)
      )
    }
  })
}
ngOnDestroy(): void {
  this.subscription?.unsubscribe()
}

}
