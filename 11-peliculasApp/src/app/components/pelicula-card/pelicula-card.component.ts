import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../model/pelicula.model';

@Component({
  selector: 'app-pelicula-card',
  templateUrl: './pelicula-card.component.html',
  styles: [ ]
})
export class PeliculaCardComponent implements OnInit {

  @Input() pelicula: Pelicula;

  constructor() {

  }

  ngOnInit() {
  }




}
