import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-style',
  template: `
    <h3>ngStyle</h3>
    <ul>
      <li>
        <p style="font-size: 15px;">
          Etiqueta con font en atributo style
        </p>
      </li>
      <li>
        <p [ngStyle]="{'font-size': tamano + 'px', 'color':color}" >
        Etiqueta con [ngStyle]
        </p>
        <button class="btn btn-success m-1" (click)="color='green'">
          verde
        </button>

        <button class="btn btn-primary m-1" (click)="color='blue'">
          Azul
        </button>
      </li>
      <li>
        <p [style.fontSize]="'10px'" >
          Etiqueta con [style.fontSize]
        </p>
      </li>
      <li>
        <p [style.fontSize.px]="tamano" >
          Etiqueta con [style.fontSize] con tamaño en variable
        </p>
      </li>

      <button class="btn btn-primary m-1" (click)="tamano=tamano+1">
        <i class="fa fa-plus"> </i>
      </button>

      <button class="btn btn-primary m-1" (click)="tamano=tamano-1">
        <i class="fa fa-minus"> </i>
      </button>

    </ul>

  `,
  styles: []
})
export class NgStyleComponent implements OnInit {

  tamano = 20;
  color = 'blue';

  constructor() { }

  ngOnInit() {
  }

}
