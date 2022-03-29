
import { AbstractControl, ValidationErrors } from '@angular/forms';


export class FileTypeValidator {

  constructor() { }

  static fileTypeValidator(control: AbstractControl): ValidationErrors | null {
    const imgType = ['jpg', 'jpeg', 'png'];
    let type = control?.value?.split('.')[1];
    if (!imgType.includes(type)) {
      return {
        fileTypeValidator: true //'Please upload JPEG, JPG or PNG files'
      }
    }

    return null
  }
}
