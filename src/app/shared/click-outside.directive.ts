import {
    Directive,
    ElementRef,
    Output,
    EventEmitter,
    HostListener
  } from '@angular/core';

  @Directive({
      selector: '[appClickOutside]'
    })
  export class ClickOutsideDirective {
    constructor(
      private _ElementRef: ElementRef,
    ) {}

    @Output('appClickOutside')

    clickOutside = new EventEmitter();

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        const clickedInside = this._ElementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(null);
        }
    }
  }
