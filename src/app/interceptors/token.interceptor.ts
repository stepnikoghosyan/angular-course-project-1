import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {catchError, EMPTY, Observable, throwError} from 'rxjs';
import {StorageService} from "../services/storage.service";
import {AuthService} from "../modules/auth/services/auth.service";
import {NotificationService} from "../services/notification.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService,
              private authService: AuthService,
              private notificationService: NotificationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addToken(req))
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case 403:
                this.authService.logout();
                return EMPTY;
              case 401:
                if (this.storageService.getAccessToken()) {
                  this.authService.logout();
                }
                return throwError(() => error);
              case 500:
                this.notificationService.showError('Internal Server Error');
            }
          }
          return throwError(() => error);
        })
      )
  }

  private addToken(req: HttpRequest<any>) {
    const accessToken = this.storageService.getAccessToken();
    if (!accessToken) {
      return req;
    }
    return req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${accessToken}`
      ),
    });
  }
}
