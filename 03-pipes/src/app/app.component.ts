import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pipes';
  propiedad  = 'Alberto Cuesta';
  texto = 'AlBerTO CueSTA GuTiéRRez TejeDoR MenDoZA';
  arrPropiedad: number [] = [1, 2, 3, 4, 5, 6, 7 , 8, 9, 10 ];
  PI: number = Math.PI;
  numero = 0.234;
  salario = 1234.5;

  heroe: any = {
    nombre : 'Logan',
    clave  : 'Wolverine',
    edad : 500,
    direccion : {
      calle : 'Graymalkin Lane',
      numero: '1407',
      location: 'Salem Center'
    }
  };


  promesa = new Promise( (success , error) => {
    setTimeout ( () => {
        success('LLegaron los datos');
      }, 3500);
    });

  promesaStr = JSON.stringify(this.promesa);

  fecha: Date = new Date();
  video = 'xGqkR4bqoY8';

  encrypting = true;
}
