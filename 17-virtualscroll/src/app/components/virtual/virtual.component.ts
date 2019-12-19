import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-virtual',
  templateUrl: './virtual.component.html',
  styles: []
})
export class VirtualComponent implements OnInit {

  @ViewChild( CdkVirtualScrollViewport, { static: false} ) viewport: CdkVirtualScrollViewport;

  personas = Array(500).fill(0);

  constructor() {
    console.log(this.personas);
   }

  ngOnInit() {
  }

  irFinal() {
    this.viewport.scrollToIndex( this.personas.length );
  }

  irInicio() {
    this.viewport.scrollToIndex( 0 );
  }
}
