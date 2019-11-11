import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesComponent } from '../heroes/heroes.component';
import { HeroesService, Heroe } from '../../services/heroes.service';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: Heroe;

  /* Utilizo la pagina para presentar los datos cuando se viene desde heroes y desde findHeroes
    Como los datos se cargan en el constructor, en funcion del tipo de parametro que venga en la
    llamada, utilizo un metodo u otro para cargar el heroe desde el servicio.
  */
  constructor(private activateRoute: ActivatedRoute,
              private heroeService: HeroesService) {  }

  ngOnInit(): void {
    // Con funcion flecha
    this.activateRoute.params.subscribe( (params) => {
      this.heroe = this.heroeService.getHeroeByNombre(params.id);
  });
  }

}
