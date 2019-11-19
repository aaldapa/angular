import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista-model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input()
  tabRedireccion: string;

  // Para capturar el elemento html del componente llamado #lista
  @ViewChild( 'listaHtml', {static: false})
  listaHtml: IonList;

  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertController: AlertController) { }

  ngOnInit() {}

  verLista(listaId: number) {
    this.router.navigateByUrl(`/tabs/${this.tabRedireccion}/agregar/${listaId}`);
  }

  borrarLista(lista: Lista) {
    this.deseosService.borrarLista(lista);
  }

  async editarLista(lista: Lista) {

    const alert = await this.alertController.create({
      header: 'Editar nombre de lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista',
          value: lista.titulo
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Actualizar',
          handler: ( data ) => {

              if ( data.titulo.length === 0) {
                 return;
              } else {
                lista.titulo = data.titulo;
                this.listaHtml.closeSlidingItems();
                this.deseosService.guardarStorage();
              }
          }
        }
      ]
    });

    alert.present();
  }

cerrar() {}


}
