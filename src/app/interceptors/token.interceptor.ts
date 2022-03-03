import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = JSON.parse(localStorage.getItem('auth')!) || JSON.parse(sessionStorage.getItem('auth')!);
    if (auth) {
      const newReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${auth.accessToken}`
        ),
      });
      return next.handle(newReq);
    }
    return next.handle(req);
  }
}
