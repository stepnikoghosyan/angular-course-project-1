import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanLoad {
    constructor(private authService: AuthService){}
    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean |
            UrlTree> | Promise<boolean |
            UrlTree> | boolean | UrlTree {
                console.log("GUARD", this.authService.isLoggedIn);
                return  this.authService.isLoggedIn;
    }
}
