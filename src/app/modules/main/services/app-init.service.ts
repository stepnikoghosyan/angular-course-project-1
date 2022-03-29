import { Injectable } from '@angular/core';
import { UsersService } from './users.service';

@Injectable()

export class AppInitService {

  constructor(private usersService: UsersService) { }
  appInit(){
    return new Promise<void>((resolve, reject)=>{
        console.log("APP INIT CALLED");
        resolve();
    })
  }
}

