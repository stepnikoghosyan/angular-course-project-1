import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree,} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()
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
    const authLocale = localStorage.getItem('auth');
    const authSession = sessionStorage.getItem('auth');
    if ((authLocale && JSON.parse(authLocale!).accessToken) || (authSession && JSON.parse(authSession!).accessToken)) {
      return this.router.parseUrl('/home');
    }
    return true;
  }
}
