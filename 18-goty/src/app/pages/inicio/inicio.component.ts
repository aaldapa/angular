import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Game } from '../../interfaces/intefaces';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: []
})
export class InicioComponent implements OnInit {

  juegos: {name: string, value: number} [] = [];

  constructor( private db: AngularFirestore) { }

  ngOnInit() {

    this.db.collection('goty').valueChanges()
      .pipe(
            // Este map es una utilidad de la libreria rxjs.
            // La peticion recibe una lista de juegos, pero para grafica trabaja con objetos con atributos name y value
            // por eso necesitamos transformar la lista de juegos a una lista de objetos valida para la grafica.
          map( (resp: Game[]) => {
            // console.log('Juegos', resp);

            // Este map es una funcion de los arrays. Nos permite ejecutar la funcion por cada juego devuelvo
            // y devolver un nuevo objeto que tiene tan solo el name y el value
            return resp.map ( (juego: Game) => {
              // console.log('objeto para reutilizar en la grafica', {name: juego.name, value: juego.votos});
              return {
                name: juego.name,
                value: juego.votos
              };
            });
          })
      ).subscribe( resp => {
        // console.log('array para grafica', resp);
        this.juegos = resp;
      }

      );
  }

}


/**
 * NOTA: Ojo, no debes confundir el operador map con Array.map.
 * Son ideas similares, pero el operador map trabaja sobre un flujo de eventos,
 * mientras que Array.map trabaja sobre los elementos de un array.
 */
