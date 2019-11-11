import { Component, OnInit } from '@angular/core';
import { HeroesService, Heroe } from '../../services/heroes.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-finded-heroes',
  templateUrl: './finded-heroes.component.html'
})

export class FindedHeroesComponent implements OnInit {

  findedHeroes: Heroe[];
  term: string;

  constructor(private activateRoute: ActivatedRoute,
              private router: Router,
              private heroeService: HeroesService) {
  }

  ngOnInit() {
    this.activateRoute.params.subscribe( (params) => {
      this.findedHeroes = this.heroeService.findHeroes(params.term);
      this.term = params.term;
      // console.log(this.term, this.findedHeroes);
    });
  }

  // Redireccion a /heroe pasando el nombre como parametro
  verHeroes(nombre: string) {
    this.router.navigate(['/heroe', nombre]);
  }

}
