import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/classes/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {


  marcadores: Marcador[] = [];

  lat = 43.309341;
  lng = -3.0074501;

  constructor( private snackBar: MatSnackBar,
               public dialog: MatDialog) {

    if ( localStorage.getItem('marcadores') ) {
      this.marcadores = JSON.parse( localStorage.getItem('marcadores'));
    }


  }

  ngOnInit() { }

  agregarMarcador( evento: any) {
    console.log(evento.coords);
    const coords = evento.coords;

    const nuevoMarcador = new Marcador (coords.lat, coords.lng);
    this.marcadores.push( nuevoMarcador );

    this.guardarStorage();

    this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000});
  }

  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify( this.marcadores ) );
  }

  borrarMarcador( i: number ) {
    this.marcadores.splice(i, 1);
    this.guardarStorage();
    this.snackBar.open('Marcador eliminado', 'Cerrar', { duration: 3000});
  }

  editarMarcador( marcador: Marcador) {
    const dialogRef = this.dialog.open( MapaEditarComponent, {
      width: '250px',
      data: { titulo: marcador.titulo, desc: marcador.desc }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      if (!result) {
        return;
      }

      marcador.titulo = result.titulo;
      marcador.desc = result.desc;

      this.guardarStorage();
      this.snackBar.open('Marcador actualizado', 'Cerrar', { duration: 3000});
    });

  }
}
