import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {StorageService} from "../services/storage.service";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router,
              private storageService: StorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return this.checkAuthentication();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    return this.checkAuthentication();
  }

  private checkAuthentication(): boolean | UrlTree {
    const auth = this.storageService.getAccessToken();
    if (auth) {
      return true;
    }
    return this.router.parseUrl('/auth/login');
  }
}
