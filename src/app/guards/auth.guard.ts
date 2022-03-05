import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      const local = localStorage.getItem('auth');
      const session = sessionStorage.getItem('auth')

      if ((local && JSON.parse(local).accessToken) || (session && JSON.parse(session).accessToken)) {
        return true;
      }
      return this.router.parseUrl('/login');
    }
  
}
