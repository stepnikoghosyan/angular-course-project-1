import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dots'
})
export class DotsPipe implements PipeTransform {

  transform(value: string) {
    let trimmedValue = value.slice(0, 30)
    if(trimmedValue.length < value.length) {
      return trimmedValue += '...' 
    } 
    return trimmedValue
  }
}
