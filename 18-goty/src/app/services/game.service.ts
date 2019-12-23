import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Game } from '../interfaces/intefaces';

import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class GameService {

  private juegos: Game [] = [];

  constructor( private http: HttpClient ) {   }

  getNominados() {

    /**
     * Solo queremos cargar los juegos una vez, la primera vez que se entre a la pagina de votar.
     * Para ello, cargamos un array de juegos y si ya esta cargado no volvemos a cargarlo.
     */
    if ( this.juegos.length === 0 ) {

      // console.log('desde internet');
      // <Game[]> en el get sirve para indicar el tipo de dato que obtiene
      return this.http.get<Game[]>(`${environment.url}/api/goty`)
      // Pasamos la respuesta por un pipe para almacenarla en el array de juegos
      .pipe(
        // El operador map sirve para asignar respuesta al array de juegos
        map(
          juegos => this.juegos = juegos
          )
      );

    }
    // console.log('desde cache');


    // La funcion "of" de rxjs permite devolver un objeto cualquiera como un Observable
    return of (this.juegos);

  }

  votarNominado( id: string) {
    // Aunque la API no retorne nada debemos hacer return.
    return this.http.post(`${environment.url}/api/goty/${id}`, null)
      .pipe(
        catchError( err => {
          return of(err.error);
        })
      );

  }

}
