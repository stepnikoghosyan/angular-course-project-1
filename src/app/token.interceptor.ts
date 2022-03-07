import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const auth = JSON.parse(localStorage.getItem('access_token')!); //vercnum em locali accept tokeni accept key
      console.log(auth)
    if(auth && auth.accessToken){
       const newReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ${accessToken}')
      })
      return next.handle(newReq);
    }
      
      return next.handle(request);
  
  }
}
