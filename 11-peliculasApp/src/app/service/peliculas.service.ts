import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Pelicula } from '../model/pelicula.model';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  urlApi = 'https://api.themoviedb.org/3';
  token = '?api_key=429a63128682c53bbdb89494036108de';
  language = '&language=es';

  constructor( private http: HttpClient) {
    // console.log(`${this.urlApi}/discover/movie${this.token}`);
  }

  /**
   * Obtiene las peliculas mas populares
   */
  getPopularMovies() {
    return this.http.jsonp(`${this.urlApi}/discover/movie${this.token}${this.language}`, 'callback')
    .pipe(
       map( (resp: any) => {
        // console.log(resp.results);
        return this.parsePeliculas(resp.results);
      })
    );
  }

  /**
   * Obtiene las peliculas de cartelera en la fecha de hoy
   */
  getTheaterMovies() {
    const date: string = new Date().toISOString().split('T')[0];
    return this.http.jsonp(`${this.urlApi}/discover/movie${this.token}&primary_release_date.gte=${date}${this.language}`, 'callback')
      .pipe(
       map( (resp: any) => {
        // console.log(resp.results);
        return this.parsePeliculas(resp.results);
      })
    );
  }

  /**
   * Obtiene las peliculas mas populares entre los pequeños
   */
  getPopularKindsMovies() {
    const kidParam = '&certification_country=US&certification=G&sort_by=popularity.desc';
    // console.log(`${this.urlApi}/discover/movie${this.token}${kidParam}${this.language}`);

    return this.http.jsonp(`${this.urlApi}/discover/movie${this.token}${kidParam}${this.language}`, 'callback')
    .pipe(
       map( (resp: any) => {
        // console.log(resp.results);
        return this.parsePeliculas(resp.results);
      })
    );
  }

  /**
   * Metodo para buscar peliculas
   * @param term termino de busqueda
   * @returns lista de peliculas maximo 6
   */
  findMovies(term: string) {
    const queryParam = '&query=' + term;
    return this.http.jsonp(`${this.urlApi}/search/movie${this.token}${queryParam}${this.language}`, 'callback')
    .pipe(
       map( (resp: any) => {
        // console.log(resp.results);
        return this.parsePeliculas(resp.results);
      })
    );
  }

  getMovieById(id: number) {
  const paramId: string = id.toString();
  console.log(id, `${this.urlApi}/movie/${paramId}${this.token}${this.language}`);

  return this.http.jsonp(`${this.urlApi}/movie/${paramId}${this.token}${this.language}`, 'callback')
  .pipe(
     map( (resp: any) => {
      // console.log(resp);
      return this.parsePelicula(resp);
    })
  );
}


  /**
   *  Trasforma un array de objetos en un array de peliculas
   * @param params Array de objetos pelicula de la API
   * @returns Devuelve un array de peliculas del nuestro objeto de modelo
   */
  parsePeliculas(params: any[]): Pelicula [] {
    const peliculas: Pelicula[] = [];

    params.forEach( (element: any, index: number) => {
        peliculas.push(this.parsePelicula(element));

    });

    return peliculas;
  }

  /**
   * TRansforma el objeto pasado en un objeto de modelo Pelicula
   * @param obj Objeto de la API
   */
  parsePelicula(obj: any): Pelicula {
    // console.log(obj);

    const pelicula = new Pelicula();
    pelicula.id = obj.id;
    pelicula.title = obj.title;
    pelicula.releaseDate = obj.release_date;
    pelicula.voteAverage = obj.vote_average;
    pelicula.overview = obj.overview;
    pelicula.popularity = obj.popularity;
    pelicula.posterPath = obj.poster_path;
    pelicula.backdropPath = obj.backdrop_path;

    // console.log(pelicula);

    return pelicula;

  }

}
