import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutside {
	constructor(private _elementRef : ElementRef) { }

  @Output()
  public clickOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
      const clickedInside = this._elementRef.nativeElement.contains(targetElement);
      if (!clickedInside) {
      		// console.log("click outside");
          this.clickOutside.emit(null);
      }
  }
}