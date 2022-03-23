import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthPublicGuard implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkAouth()
    //   const auth = localStorage.getItem('auth');
    //   if (auth) {
    //     return this.router.parseUrl('/home');
    //   }
    //   return true;
  }

  canLoad(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    return this.checkAouth()

    // const auth = localStorage.getItem('auth');
    // if (auth) {
    //   return this.router.parseUrl('/home');
    // }
    // return true;
  }


  private checkAouth() {
    const auth = localStorage.getItem('auth');
    if (auth) {
      return this.router.parseUrl('/home');
    }
    return true;
  }

}



