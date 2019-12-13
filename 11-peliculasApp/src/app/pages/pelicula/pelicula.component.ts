import { Component, OnInit } from '@angular/core';
import { filter, pairwise } from 'rxjs/operators';
import { RoutesRecognized, Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
import { PeliculasService } from '../../service/peliculas.service';
import { Pelicula } from '../../model/pelicula.model';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: []
})
export class PeliculaComponent implements OnInit {

  urlReturn: string;
  pelicula: any = {};
  fechaEstreno = new Date();


  constructor(private appComponent: AppComponent,
              private router: ActivatedRoute,
              private peliculaService: PeliculasService  ) {

    this.urlReturn = appComponent.urlAnterior;

    // Me suscribo al routeActivated para ver el parametro que me llega cuando entran a la pagina
    router.params.subscribe(
      (resp: any) => {
        this.getPelicula(resp.id);
      }
    );

    // console.log(this.urlReturn);

  }

  ngOnInit() {
  }

  getPelicula(id: number) {
    this.peliculaService.getMovieById(id)
    .subscribe( (p: Pelicula) => {
      this.pelicula = p;
      // console.log(this.pelicula);
      this.fechaEstreno = new Date(this.pelicula.releaseDate);
    });
  }
}
