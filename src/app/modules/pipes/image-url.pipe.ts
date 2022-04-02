import {Pipe, PipeTransform} from '@angular/core';
import {defaultImageUrl} from "../main/helpers/utils";

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    return value ? value : defaultImageUrl;
  }

}
