import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: ToastrService,
              private router: Router) {
  }

  showNotification(success: boolean, message: string, title?: string | null, navigationUrl?: string[]) {
    if (success) {
      this.showSuccess(message);
      navigationUrl && this.router.navigate(navigationUrl);
    } else {
      this.showError(message);
    }
  }

  showSuccess(message: string, title: string = 'Success') {
    this.toastr.success(message, title, {timeOut: 5000});
  }

  showError(message: string, title: string = 'Error') {
    this.toastr.error(message, title, {timeOut: 5000});
  }
}
