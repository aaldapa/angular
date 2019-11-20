import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  @Input('appResaltado')
  colorParaParrafo2: string;


  constructor( private el: ElementRef) {
    // console.log('directiva llamada');
  }

  @HostListener('mouseenter') mouseEntro(event) {
    this.resaltar(this.colorParaParrafo2 || 'yellow');
  }

  @HostListener('mouseleave') mouseSalio() {
    this.resaltar(null);
  }

  private resaltar(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
