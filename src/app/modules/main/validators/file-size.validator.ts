import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function fileSizeValidator(sizeInBytes: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file: File = control.value;
    const fileSize = convertByteToMegaByte(file?.size);
    return fileSize > sizeInBytes ? {
      fileSize: {
        allowedSize: sizeInBytes
      }
    } : null;
  };
}

function convertByteToMegaByte(sizeInBytes: number): number {
  const bytesInOneMegaByte = 1024 * 1024;
  return sizeInBytes / bytesInOneMegaByte;
}
