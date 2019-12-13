import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pelicula } from 'src/app/model/pelicula.model';
import { PeliculasService } from '../../service/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
})
export class BuscarComponent implements OnInit {

  terminoBusqueda: string;
  peliculas: Pelicula [];
  loading: boolean;

  constructor(private activatedRouter: ActivatedRoute,
              private router: Router,
              public peliculasService: PeliculasService) {

    this.loading = false;

    // Me suscribo al routeActivated para ver el parametro que me llega cuando entran a la pagina
    activatedRouter.params.subscribe(
      (resp) => {
        // console.log(resp);
        if (Object.keys(resp).length > 0) {
          this.terminoBusqueda = resp.term;
          this.lanzarBusqueda (this.terminoBusqueda);
        } else {
          this.terminoBusqueda = '';
        }
      }
    );

  }

  lanzarBusqueda(term: string) {
  //  console.log(term);

    // Elimino las peliculas existentes
   this.peliculas = [];
   if (term) {
      this.loading = true;

      this.peliculasService.findMovies(term)
           .subscribe ( (params: Pelicula[] ) => {
             this.peliculas = params;
             this.loading = false;
           });
    }
  }


  enrutar(term: string) {
    // console.log(term);
    this.router.navigate(['/buscar', term]);
  }
  ngOnInit() {
  }

}
