import {Component, Input, Optional, Self} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})

export class PasswordComponent implements ControlValueAccessor {
  @Input() label = 'Password';

  showPass = false;
  password = '';

  constructor(@Self() @Optional() public control: NgControl) {
    this.control && (this.control.valueAccessor = this);
  }

  onChange(password: string): any {
  };

  onTouch(): any {
  };

  writeValue(value: any) {
    this.password = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn
  }

  togglePass() {
    this.showPass = !this.showPass;
  }
}
