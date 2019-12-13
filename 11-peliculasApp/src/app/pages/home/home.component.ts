import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../service/peliculas.service';
import { Pelicula } from '../../model/pelicula.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    '.jumbotron {background-image: url("./../../../assets/img/10-Best-Hollywood-Movie-of-2012.jpg"); background-size: cover;  }  '
  ]
})
export class HomeComponent implements OnInit {

  peliculasPopulares: any[];
  peliculasEnCartelera: any[];
  peliculasPopularesPeques: any[];

  constructor( public peliculasService: PeliculasService) {

    peliculasService.getPopularMovies()
    .subscribe ( (params: Pelicula[] ) => {
        this.peliculasPopulares = params;
      }
    );

    peliculasService.getTheaterMovies()
    .subscribe ( (params: Pelicula[] ) => {
        this.peliculasEnCartelera = params;
      }
    );

    peliculasService.getPopularKindsMovies()
    .subscribe ( (params: Pelicula[] ) => {
        this.peliculasPopularesPeques = params;
      }
    );

  }

  ngOnInit() {
  }

}
