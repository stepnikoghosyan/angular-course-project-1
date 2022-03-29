import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {
  messageControl = new FormControl(null, [Validators.required]);
  @Input() user: UserModel | null = null;
  @Output() send = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  sendMessage(): void {
    if (this.messageControl.invalid) {
      return;
    }
    const message = this.messageControl.value.trim();
    if (message) {
      this.messageControl.reset();
      this.send.emit(message);
    }
  }

}
