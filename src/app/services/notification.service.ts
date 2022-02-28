import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: ToastrService) {
  }

  showSuccess(title: string, message: string) {
    this.toastr.success(message, title, {timeOut: 2000});
  }

  showError(title: string, message: string) {
    this.toastr.error(message, title, {timeOut: 2000});
  }
}
