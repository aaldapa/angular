import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from 'src/app/models/lista-model';

@Pipe({
  name: 'filtroCompletado',
  /* Por defecto todos los pipes son puros, es decir, solo se van a llamar cuando la accion del ciclo
     de deteccion de cambios suceda en el mismo componente donde se esta usando.
     Al ponerlo en false siempre se llama
  */
  pure: false
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform(listas: Lista[], tabActual = 'tab1'): Lista[] {

    if (tabActual === 'tab1') {
      return listas.filter ( lista => ! lista.terminada);
     } else {
       return listas.filter ( lista => lista.terminada);
    }
  }

}
