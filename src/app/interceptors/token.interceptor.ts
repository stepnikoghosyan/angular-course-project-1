import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(
    request: HttpRequest<unknown>, 
    next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
      const item = localStorage.getItem('auth') || sessionStorage.getItem('auth') 

      if (!item) {
        return next.handle(request)
      }
        try {
          const auth  = JSON.parse(item)

        if (auth) {
          const newReq = request.clone({
            headers: request.headers.set(
              'Authorization',
              `Bearer ${auth.accessToken}`
            ),
          });
          return next.handle(request)
        }
    
      }

      catch(err) {
        return next.handle(request)
      }
      return next.handle(request)
    }
  }






//         const auth = JSON.parse(localStorage.getItem('auth')!) 
//         if (auth && auth.accessToken) {
//           const newReq = request.clone({
//             headers: request.headers.set(
//               'Authorization',
//               `Bearer ${auth.accessToken}`
//             ),
//           });
//           return next.handle(newReq);
//         }
    
//         return next.handle(request);
//   }
// }
