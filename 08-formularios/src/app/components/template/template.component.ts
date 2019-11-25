import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }
  `]
})
export class TemplateComponent implements OnInit {

  // tslint:disable-next-line: ban-types
  usuario: Object = {
    nombre: null,
    apellido: null,
    email: null,
    pais: 'ES',
    sexo: 'H',
    aceptado: false
  };


  paises = [
        {codigo : 'EN', descripcion : 'England'},
        {codigo : 'ES', descripcion : 'Spain'},
  ];

  constructor() { }

  ngOnInit() {
  }

  guardar(idFormulario: NgForm) {
    console.log('Formulario enviado..');
    console.log('ngForm ', idFormulario);
    console.log('Valor', idFormulario.value);

    console.log('Usuario', this.usuario);
  }

}
