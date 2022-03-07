import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthPublicGuard implements CanActivate {
  constructor(private route:Router, private authService:AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree>
    | Promise<boolean| UrlTree> 
    | boolean
    | UrlTree {
      if(!this.authService.isLoggedIn()){
      
        return true;
      }
      return this.route.parseUrl('users');
  }
}
  

