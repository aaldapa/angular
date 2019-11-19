import { Injectable } from '@angular/core';
import { Lista } from '../models/lista-model';
import { ListaItem } from '../models/lista-item.model';



@Injectable({
  // Con esta anotacion no es necesario incluir el servicio en la lista
  //  de providers de app.module.ts
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista [] = [];

  constructor() {
    this.cargarStorage();
  }

  crearLista( titulo: string): number {

    const nuevaLista = new Lista (titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();

    return nuevaLista.id;
  }

  borrarLista( lista: Lista) {
    this.listas = this.listas.filter( listaData => listaData.id !== lista.id );
    this.guardarStorage();
  }


  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  cargarStorage() {
    if (localStorage.getItem('data')) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    } else {
      this.listas = [];
    }
  }

  obtenerLista(idLista: string | number) {
    idLista = Number (idLista);

    return this.listas.find ( listaData => listaData.id === idLista );
  }

}
