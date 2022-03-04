import { Pipe, PipeTransform } from '@angular/core';
import { Pages } from './module/pages';
Pages
@Pipe({
  name: 'tostring'
})
export class TostringPipe implements PipeTransform {
private toString ={
  [Pages.Auth]: "auth",
  [Pages.Home]: "home",
  [Pages.Posts]: "posts",
  [Pages.Profile]: "profile",
  [Pages.Users]: "users",
}
  transform(value: Pages): string {
    return this.toString[value];
  }

}
