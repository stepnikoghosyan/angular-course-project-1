import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment, UrlTree,} from '@angular/router';
import {StorageService} from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthPublicGuard implements CanLoad {
  constructor(private router: Router,
              private storageService: StorageService) {
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    return this.checkAuthentication()
  }

  private checkAuthentication(): boolean | UrlTree {
    const auth = this.storageService.getAccessToken();
    if (auth) {
      return this.router.parseUrl('/home');
    }
    return true;
  }
}
