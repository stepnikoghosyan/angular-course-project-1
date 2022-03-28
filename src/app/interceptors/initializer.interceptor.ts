// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class InitializerInterceptor implements HttpInterceptor {

//   constructor() {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     return next.handle(request);
//   }
// }
import { APP_INITIALIZER } from "@angular/core";
import { AuthService } from "../modules/auth/services/auth.service";

export function appInitializer(authService: AuthService) {
  return () => authService.checkCurrentLoggedInUser();
}

export const appInitializercreater = {
    provide: APP_INITIALIZER,
    useFactory: appInitializer,
    deps: [AuthService],
    multi: true
}
