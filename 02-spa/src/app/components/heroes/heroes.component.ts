import { Component, OnInit } from '@angular/core';
import { HeroesService, Heroe } from '../../services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {

  heroes: Heroe[] = [];

  // El servicio queda listo para usarse en el componente
  constructor(private heroesService: HeroesService,
              private router: Router) {
  }

  ngOnInit() {
    // cargo todos los heroes en el array para mostrarlos por pantalla al inicio de la pagina
    this.heroes = this.heroesService.getHeroes();
  }

  // Enruto a /heroes enviando el parametro recibido
  verHeroes(nombre: string) {
    this.router.navigate(['/heroe', nombre]);
  }

}

