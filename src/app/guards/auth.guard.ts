import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad {
    constructor(private router: Router) { }
    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean | UrlTree> |
        Promise<boolean | UrlTree> |
        boolean | UrlTree {

        const auth = localStorage.getItem('auth');
        try {
            if (auth && JSON.parse(auth).accessToken) {
                
                return this.router.parseUrl('/home');
                
            }
            return true;

        } catch (err) {
            console.log("Auth Guard's Error");
            return true;
        }
    }
}

