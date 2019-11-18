import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListasComponent } from './listas/listas.component';
import { DeseosService } from '../services/deseos.service';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ListasComponent
  ]
    ,
  exports: [
    ListasComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
