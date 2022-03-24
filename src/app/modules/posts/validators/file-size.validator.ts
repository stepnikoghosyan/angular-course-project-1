import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {FILE_SIZE_MEGABYTE} from "../constants";

export function fileSizeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file: File = control.value;
    const fileSize = convertByteToMegaByte(file?.size);
    return fileSize > FILE_SIZE_MEGABYTE ? {fileSize: true} : null;
  };
}

function convertByteToMegaByte(sizeInBytes: number): number {
  const bytesInOneMegaByte = 1024 * 1024;
  return sizeInBytes / bytesInOneMegaByte;
}
