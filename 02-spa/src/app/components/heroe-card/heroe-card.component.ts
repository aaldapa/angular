import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import { HeroesService, Heroe } from '../../services/heroes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-heroe-card',
  templateUrl: './heroe-card.component.html',
  styles: []
})
export class HeroeCardComponent implements OnInit {

  // Recojo el heroe pasado como parametro desde el uso de la etiqueta app-heroe-card
  @Input() heroe: Heroe;

  // Evento de salida que al que el padre estará escuchando para recibir datos
  @Output() heroeSeleccionado: EventEmitter <string>;

  // El servicio queda listo para usarse en el componente
  constructor(private router: Router) {
    this.heroeSeleccionado = new EventEmitter ();
  }

  ngOnInit() {
  }

  // // Enruto a /heroes enviando el parametro recibido
  // verHeroe(nombre: string) {
  //   // this.router.navigate(['/heroe', nombre]);
  //   this.heroeSeleccionado.emit(nombre);
  // }

  verHeroe(nombre: string) {
      // this.router.navigate(['/heroe', nombre]);
      this.heroeSeleccionado.emit(nombre);
  }
}
