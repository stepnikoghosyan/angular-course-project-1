import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

import {NotificationService} from "../services/notification.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private notifyService: NotificationService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const auth = localStorage.getItem('auth') || sessionStorage.getItem('auth');
    try {
      if (auth && JSON.parse(auth).accessToken) {
        return this.router.parseUrl('/home');
      }
      return this.router.parseUrl('/login');
    } catch (ex: any) {
      this.notifyService.showError('Error', ex.message);
      return true;
    }
  }
}
