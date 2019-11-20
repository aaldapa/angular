import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-class',
  templateUrl: 'ng-class.component.html',
  styles: []
})
export class NgClassComponent implements OnInit {

  alerta = 'alert-danger';

  // tslint:disable-next-line: ban-types
  propiedades: Object = { danger: false};

  cargando = false;

  constructor() { }

  ngOnInit() {
  }

  ejecutar() {
    this.cargando = true;
    setTimeout( () => this.cargando = false, 3000);
  }

}
