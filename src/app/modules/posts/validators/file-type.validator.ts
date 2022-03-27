import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function fileTypeValidator(mimeTypes: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file: File = control.value;
    const fileExtension = file?.type;
    console.log(fileExtension);
    return (fileExtension && !mimeTypes.includes(fileExtension)) ?
      {
        fileType: {
          allowedTypes: mimeTypes
        }
      } : null;
  };
}


