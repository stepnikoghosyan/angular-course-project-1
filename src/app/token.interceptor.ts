import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const auth = sessionStorage.getItem('auth') || localStorage.getItem('auth');
    if (auth) {
      const newReq = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${auth}`
        ),
      });
      return next.handle(newReq);
    }

    return next.handle(request);
  }
}
