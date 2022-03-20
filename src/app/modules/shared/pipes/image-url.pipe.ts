import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  private defaultImageUrl = 'assets/images/default.jpg';

  transform(value: string | null | undefined): string {
    return value ? value : this.defaultImageUrl;
  }

}
