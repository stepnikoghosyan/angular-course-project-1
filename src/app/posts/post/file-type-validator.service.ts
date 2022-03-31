
import { AbstractControl, ValidationErrors } from '@angular/forms';


export class FileTypeValidator {

  constructor() { }

  static fileTypeValidator(control: AbstractControl): ValidationErrors | null {
    const imgType =  control?.value?.type?.split('/');
    console.log(imgType);
    const type = ['png','jpg','jpeg'];
   

    if (type.includes(imgType[1])) {
      return {
        fileType: true
      }
    }
    return null
  }
}
