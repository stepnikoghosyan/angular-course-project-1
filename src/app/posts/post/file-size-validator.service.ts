
import { AbstractControl, ValidationErrors } from '@angular/forms';


export class FileSizeValidator {

  constructor() { }

  static sizeValidator(control: AbstractControl, size: number): ValidationErrors | null {

    console.log(size)
    if (size > 2048) {
      return {
        sizeValidator: true//'file size should not be more than 2mb'
      }
    }
    return null

  }
}
