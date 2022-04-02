import {Pipe, PipeTransform} from '@angular/core';
import {defaultImageUrl} from "../main/helpers/utils";

@Pipe({
  name: 'profilePic'
})
export class ProfilePicPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? value : defaultImageUrl;
  }

}
