import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authLocal = localStorage.getItem('auth');
    const authSession = sessionStorage.getItem('auth');
    if ((authLocal && JSON.parse(authLocal!).accessToken) || (authSession && JSON.parse(authSession!).accessToken)) {
      return true;
    }
    return this.router.parseUrl('/login');
  }
}
