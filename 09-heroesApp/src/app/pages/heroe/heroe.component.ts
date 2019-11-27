import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';

// Importacion para trabajar con las alertas
import Swal from 'sweetalert2';

// Importacion para utilizar la clase Observable (para manejo de respuestas en peticiones http)
import { Observable } from 'rxjs';

// Importacion para poder leer parametros de la ruta
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  // La ingenieria de angular se encarga de hacer el binding del modelo y el formulario
  heroe: HeroeModel = new HeroeModel();

  constructor( private heroeService: HeroesService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this.heroeService.obtenerHeroe(id)
      .subscribe( (resp: HeroeModel) => {
        // El objeto que recibe la peticion no tiene el id asi que asignamos el recibido como parametro
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
    console.log(id);

  }

  /**
   * Metodo de insercion y actualizacion de heroes
   * @param heroeForm formulario de heroe
   */
  guardar(heroeForm: NgForm) {

    // Validacion del formulario
    if ( heroeForm.invalid ) {
      console.log('Formulario no valido');
      return;
    }

    // Muestra la ventana emergente
    Swal.fire( {
      title: 'Espere',
      text : 'Guardando información',
      icon : 'info',
      allowOutsideClick: false
    });
    // Muestra loading en la ventana emergente
    Swal.showLoading();

    /* Para no repetir el tratamiento en la respuesta a la peticion http de los metodos actualizar y crear
     * creo una variable de tipo Observable (lo que devuelven las peticiones http) para recoger las respuestas
     * y realizar la misma operación.
     */
    let peticion: Observable<any>;

    // Si el formulario tiene id, se trata de una actualizacion
    if (this.heroe.id != null) {

      // this.heroeService.actualizarHeroe(this.heroe)
      //  .subscribe( resp => { console.log(resp); });

      peticion = this.heroeService.actualizarHeroe(this.heroe);

    } else {

      // Como en JS todos los objetos son pasados como referencia, los valores del heroe devueltos
      // son cargados en el heroe que enviamos. Por eso no necesitariamos hacer: this.heroe = resp;

      // this.heroeService.crearHeroe(this.heroe)
      //  .subscribe( resp => { console.log(resp); });

      peticion = this.heroeService.crearHeroe(this.heroe);
    }


    peticion.subscribe( resp => {

      Swal.fire({
        title : this.heroe.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });

    });
  }

}
