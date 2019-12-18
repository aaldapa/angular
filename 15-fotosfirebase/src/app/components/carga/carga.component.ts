import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-items';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  estaSobreElemento = false;

  archivos: FileItem [] = [];

  constructor( public cargaImagenesService: CargaImagenesService) { }

  ngOnInit() {
  }


  cargarImagenes() {
    this.cargaImagenesService.cargarImagenesFirebase( this.archivos );
  }

  limpiarArchivos() {
    this.archivos = [];
  }


  pruebaSobreElemento(event) {
    console.log(event);
  }

}
