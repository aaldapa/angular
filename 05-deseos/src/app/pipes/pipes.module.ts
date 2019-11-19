import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { FiltroCompletadoPipe } from './filtro-completado.pipe';



@NgModule({
  declarations: [FiltroCompletadoPipe],
  /* Como no voy a usar ng-if, ng-for, etc.. no me hace falta este import
  imports: [
    CommonModule
  ]
  */
 // Para poder utilizar los componentes, en este caso pipes del modulo he de exportarlos
 exports: [FiltroCompletadoPipe]
})
export class PipesModule { }
