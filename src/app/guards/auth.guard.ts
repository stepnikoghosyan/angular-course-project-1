import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { mapTo, Observable, tap } from 'rxjs';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UsersService) {}
  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
      const auth = localStorage.getItem('auth');
      const auth1 = sessionStorage.getItem('auth');

      if (auth || auth1) {
        return this.setCurrentProfile().pipe(mapTo(true));
      }
      return this.router.parseUrl('auth/login');

      
  }

  canLoad(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    const auth = localStorage.getItem('auth');
    const auth1 = sessionStorage.getItem('auth');

    if (auth || auth1) {
      return this.setCurrentProfile().pipe(mapTo(true));
    }
    return this.router.parseUrl('auth/login');
  }

  setCurrentProfile() {
    return this.userService.userGetProfile().pipe(tap(
      profile => {
        this.userService.currentProfile = profile;
      }
    ))
  }
  
}
