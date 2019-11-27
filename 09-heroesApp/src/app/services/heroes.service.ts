import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
// El operador map sirve para transformar lo que un observable (o una peticion http) puede devolver.
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://heroesapp-52e30.firebaseio.com';

  heroe: HeroeModel;

  constructor( private http: HttpClient) { }

  /**
   * Da de alta un nuevo heroe en la base de datos de firebase
   * @param heroe Heroe del modelo (formulario)
   * @returns Observable<HeroeModel> (Heroe con el id autogenerado de base de datos)
   */
  crearHeroe( heroe: HeroeModel ): Observable<HeroeModel> {

    return this.http.post(`${this.url}/heroes.json`, heroe)
    // Pasamos la llamada por un map para quedarnos solo con el id y asignarlo al heroe recibido
    .pipe(
      map( (resp: any) => {
        // La respuesta es el ID nuevo
        heroe.id = resp.name;

        // devolvemos el heroe completo
        return heroe;
      })
    );
  }

  /**
   * Modifica el heroe recibido
   * @param heroe Modifica un heroe
   * @returns Observable <any>
   */
  actualizarHeroe( heroe: HeroeModel): Observable <any> {

    // No se desea enviar el id para que no lo inserte en bd como un atributo mas.
    // Como no se puede eliminar del objeto sin romper la referencia, enviaremos una copia
    // del heroe a la que le quitaremos la propiedad id
    const heroeTemp = {
      ... heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  /**
   * Obtiene la lista de heroes
   * @returns Observable <HeroeModel []>
   */
  obtenerHeroes(): Observable <HeroeModel []> {
    return this.http.get(`${this.url}/heroes.json`)
    .pipe(
      // map( (resp: any) => {
      //   return this.crearArreglo(resp);
      // })
      map (this.crearArreglo)
    );
  }

  /**
   * Trasforma el objeto js heroes a un array.
   * @param heroesObj Objeto js con los atributos de los heroes agrupados por id
   * @returns  HeroeModel [] Devuelve el objeto transformado array de HeroeModel
   */

  private crearArreglo( heroesObj: object ): HeroeModel [] {

    const heroes: HeroeModel [] = [];

    console.log(heroesObj);
    // Esta funcion de js permite recorrer todos los elementos que tiene un objeto
    Object.keys( heroesObj ).forEach( key => {
      // creo un heroe con los valores del objeto recorrido (no tiene la propiedad id pero tiene la key)
      const heroe: HeroeModel = heroesObj [key];
      // creamos el atributo id al heroe y con la key le asignamos valor
      heroe.id = key;

      // añado al array el heroe
      heroes.push ( heroe );

    });

    // validacion
    if ( heroesObj === null ) { return []; }

    return heroes;
  }

  /**
   * Obtiene el heroe del id pasado como parametro
   * @param id id del heroe a recuperar
   * @returns Observable con heroeModel
   */
  obtenerHeroe(id: string): Observable<any> {

    return this.http.get(`${this.url}/heroes/${id}.json`);

  }

  /**
   * Elimina el heroe del id pasado como parametro
   * @param id id del heroe a recuperar
   * @returns Observable con heroeModel
   */
  borrarHeroe(id: string): Observable<any> {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

}
