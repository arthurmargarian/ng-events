import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appPlaceholderTranslate]'
})
export class PlaceholderTranslateDirective {
  placeholder;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.placeholder = el.nativeElement.previousSibling;
  }

  @HostListener('focus') onFocus() {
    this.renderer.addClass(this.placeholder, 'transformed');
  }

  @HostListener('blur') onBlur() {
    if (!this.el.nativeElement.value) {
      this.renderer.removeClass(this.placeholder, 'transformed');
    }
  }
}
