import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }
  showSuccess() {
    this.toastr.success('Account verified', 'Succes', { timeOut: 2000 });
  }

  showError() {
    this.toastr.error('invalid activation token', 'Error', { timeOut: 2000 })
  }
}
