import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel [] = [];

  cargando = false;

  constructor( private heroeService: HeroesService) { }

  ngOnInit() {
    this.cargando = true;
    this.heroeService.obtenerHeroes()
    .subscribe( resp => {
      console.log(resp);
      this.cargando = false;
      this.heroes = resp;
    }, err => {
        this.cargando = false;
        console.error('Error en el proceso de obtencion de Heroes');
      }
    );
  }

  /**
   * Borra un heroe
   * @param id string
   */
  borrarHeroe(heroe: HeroeModel, index: number) {

    Swal.fire({
      title: 'Eliminar héroe',
      text: `¿Desea eliminar a ${heroe.nombre}?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    })
    // Regresa una promesa
    .then( resp => {

      // True cuando confirman
      if (resp.value) {

        this.heroeService.borrarHeroe(heroe.id)
        .subscribe( () => {
          this.heroes.splice(index);
          console.log(`${heroe.nombre} ha sido eliminado`);
        });

      }

    });

  }



}
