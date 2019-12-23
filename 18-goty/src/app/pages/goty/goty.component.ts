import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../interfaces/intefaces';
import { stringify } from 'querystring';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styles: []
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];

  constructor( private gameService: GameService) {


  }

  ngOnInit() {
    this.gameService.getNominados()
    .subscribe( (resp: Game[]) => {
      this.juegos = resp;
      // console.log(this.juegos);
    });
  }

  votar(juego: Game) {
    // Aunque no recibamos nada debemos hacer un suscribe para lanzar la peticion
    this.gameService.votarNominado(juego.id)
      .subscribe( (resp: {ok: boolean, mensaje: string}) => {

        if (resp.ok) {
          // Incremento el numero de votos que se visualiza
          juego.votos++;

          Swal.fire({
            title: 'Gracias!',
            text: resp.mensaje,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });

        } else {
          Swal.fire({
            title: 'Oops!',
            text: resp.mensaje,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }

        // console.log(resp);
      });

  }

}
