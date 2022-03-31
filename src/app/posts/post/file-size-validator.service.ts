
import { AbstractControl, ValidationErrors } from '@angular/forms';


export class FileSizeValidator {

  constructor() { }

  static sizeValidator(control: AbstractControl): ValidationErrors | null {

    const size = control?.value?.size;
    if (size > 2048) {
      return {
        validSize: true
      }
    }
    return null
  }
}
