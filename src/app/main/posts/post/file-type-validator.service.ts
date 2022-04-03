
import { AbstractControl, ValidationErrors } from '@angular/forms';


export class FileTypeValidator {

  constructor() { }

  static fileTypeValidator(control: AbstractControl): ValidationErrors | null {
    const imgTypes = ['image/png', 'image/jpeg', 'image/jpg']
    if (!imgTypes.includes(control?.value?.type)) {
      return {
        fileType: true
      }
    }
    return null
  }
}
