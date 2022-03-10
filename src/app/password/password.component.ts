import {Component, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors} from "@angular/forms";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PasswordComponent
    }
  ]
})

export class PasswordComponent implements ControlValueAccessor {
  @Input() label = 'Password';
  @Input() errors: ValidationErrors | null = null;

  showPass = false;
  password = '';

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
