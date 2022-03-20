import { Directive, ElementRef, HostListener } from '@angular/core';


@Directive({
  selector: '[appMultiline]'
})
export class MultilineDirective {
    value!: string;
    constructor(private el: ElementRef) { }

    @HostListener("keypress", ['$event'])
    key(e: any): string{
        this.value = this.el.nativeElement.value;
        console.log('VALUE BEFORE', this.value);
        if(e.which == 13 && e.shiftKey){
            
            this.value = this.value.concat('', '<br>');
            console.log('VALUE AFTER', this.value);
        }
        return this.value;
    }
}
