import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth/services/auth.service';


@Injectable({
    providedIn: 'root'
})
export class MainGuard implements CanLoad {
    constructor(private router: Router,
        private authService: AuthService) { }
    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean |
            UrlTree> | Promise<boolean |
                UrlTree> | boolean | UrlTree {
        
        const local = localStorage.getItem('auth');
        const session = sessionStorage.getItem('auth');
        if ((local && JSON.parse(local).accessToken) ||
            (session && JSON.parse(session).accessToken)){
            return true;
        }
        return this.router.parseUrl('/login');
    }
}
