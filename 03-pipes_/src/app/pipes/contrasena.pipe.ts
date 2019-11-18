import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'contrasena'
})
export class ContrasenaPipe implements PipeTransform {

  transform(value: any, activo: boolean = true): string {
    let nuevoValue = '';

    // console.log('pipeContraseña: ', value, activo);

    if (activo) {
      for (const c of value) {
        if (c != null) {
          nuevoValue += '*';
        }
      }
      return nuevoValue;
    } else {
      return value;
    }

  }

}
