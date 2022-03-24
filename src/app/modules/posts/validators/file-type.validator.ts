import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {FILE_EXTENSIONS} from "../constants";

export function fileTypeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file: File = control.value;
    const fileExtension = file?.type.split('/').pop()?.toLowerCase();
    return (fileExtension && !FILE_EXTENSIONS.includes(fileExtension)) ? {fileType: true} : null;
  };
}


