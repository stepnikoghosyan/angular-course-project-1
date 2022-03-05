import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const item = localStorage.getItem('auth') || sessionStorage.getItem('auth');
    if (!item)
      return next.handle(req);
    try {
      const auth = JSON.parse(item);
      if (auth) {
        const newReq = req.clone({
          headers: req.headers.set(
            'Authorization',
            `Bearer ${auth.accessToken}`
          ),
        });
        return next.handle(newReq);
      }
    } catch (ex: any) {
      return next.handle(req);
    }
    return next.handle(req);
  }
}
