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
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
      const auth = localStorage.getItem('auth');
      const auth1 = sessionStorage.getItem('auth');
      // && JSON.parse(auth!).accessToken
      if (auth || auth1) {
        return true;
      }
      return this.router.parseUrl('auth/login');

      
  }
  
}
