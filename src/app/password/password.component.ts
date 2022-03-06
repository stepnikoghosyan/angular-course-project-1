import {Component} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from "@angular/forms";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PasswordComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: PasswordComponent
    }
  ]
})
export class PasswordComponent implements ControlValueAccessor, Validator {
  showPass = false;
  pass = "";
  passwordFormControl!: AbstractControl;

  onChange: any = () => {
  }
  onTouch: any = () => {
  }

  set password(value: string) {
    if (this.pass !== value) {
      this.pass = value
      this.onChange(value)
      this.onTouch(value)
    }
  }

  get password() {
    return this.pass;
  }

  writeValue(value: any) {
    this.password = value
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

  validate(control: AbstractControl): ValidationErrors | null {
    this.passwordFormControl = control;
    return null;
  }
}
