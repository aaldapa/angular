import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';





@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {


  formulario: FormGroup;

  usuario = {
    nombreCompleto : {
      nombre: 'Alberto',
      apellido: 'Cuesta'
    },
    email: 'a@a.com',
    pasatiempos: []

  };

  constructor() {

     /* Dos formas de cargar los valores del formulario, en el caso por ejemplo de edicion por ej.
        1.- dar el valor del campo en la instancia de new FormGroup junto con las validaciones:
          this.formulario = new FormGroup( {
            nombreCompleto : new FormGroup({
            nombre: new FormControl(  this.usuario.nombreCompleto.nombre,
                                      [ Validators.required,
                                        Validators.minLength(5)
                                      ]),
            apellido: new FormControl(this.usuario.nombreCompleto.apellido, Validators.required)
          }),
          email: new FormControl(  this.usuario.email,
                                   [
                                      Validators.required,
                                      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
                                    ])
            });
        2.- cargando el objeto del modelo al formulario directamente a traves de un set:
          this.formulario.setValue ( this.usuario)
      */

    this.formulario = new FormGroup( {
      nombreCompleto : new FormGroup({
        nombre: new FormControl(  this.usuario.nombreCompleto.nombre,
                                  [ Validators.required,
                                    Validators.minLength(5)
                                  ]),
        apellido: new FormControl('', [Validators.required,
                                      this.validacionPersonalizada
                                      ])
      }),
      email: new FormControl('', [
                                    Validators.required,
                                    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
                                  ]),
      pasatiempos: new FormArray([
                                    new FormControl('Correr', Validators.required),
                                    new FormControl('Dormir', Validators.required),
      ]),
      username: new FormControl ('', Validators.required
                                   , [this.existeUsuario]
                                ),
      password1: new FormControl ('', Validators.required),
      password2: new FormControl ()
    });

    // Se pueden settear directamente los valores en el formulario a cargar
    // this.formulario.setValue ( this.usuario );

    // Se puede settear tambien los validadores
    this.formulario.controls.password2.setValidators([
                                                        Validators.required
                                                        // Para decirle que this es el formulario, se utiliza bind
                                                        , this.validacionNoIgual.bind(this.formulario)
                                                      ]);


    // Para observar todos cambios en los elementos del formulario
    this.formulario.valueChanges
    .subscribe ( resp => {
      // console.log(resp);
    });

    // Para observar los cambios en el input username
    this.formulario.controls.username.valueChanges
    .subscribe ( resp => {
      // console.log(resp);
    });

    // Para observar el estado del input username
    this.formulario.controls.username.statusChanges
    .subscribe ( resp => {
      console.log(resp);
    });

  }




  guardarCambios() {
    // console.log(this.formulario.value);
    // console.log(this.formulario);

    this.usuario = this.formulario.value;

    // console.log({usuario: this.usuario});


  }

  resetear() {
    // Reiniciar valores del formulario


    this.formulario.reset ( this.usuario );

    /* Otra forma es darle valores ''

      this.formulario.reset (  {
        nombreCompleto : {
          nombre: '',
          apellido: ''
        },
        email: ''
      });

    // Tambien se puede asignar un valor individual al usuario y luego asignarle el objeto al formulario

        this.usuario.nombreCompleto.nombre = '';
        this.formulario.reset ( this.usuario );

    // Otra mas

      this.formulario.controls.email.setValue('b@b.com');
      // o esto, que es lo mismo
      this.formulario.controls['email'].setValue('b@b.com');

    */
  }

  agregarPasatiempo() {
    /* (<FormArray> this.formulario.controls.pasatiempos).push(
        new FormControl('Dormir', Validators.required)
       )
    */
    (this.formulario.controls.pasatiempos as FormArray).push(
      new FormControl('', Validators.required)
    );
  }

  eliminarPasatiempo() {
    const pasatiempos = (this.formulario.controls.pasatiempos as FormArray);

    if (pasatiempos.length > 1) {
      pasatiempos.removeAt(pasatiempos.length - 1);
    }
  }

  /**
   * Validacion personalizada.
   * Devuelve error si el apellido insertado en el input comienza por 'c'
   * @param control Recibe como parametro el valor del input
   * @returns Devuelve un objeto con la estructura {[s: string]: boolean}
   * Se puede dar any al tipo de retorno, pero indicar el tipo es lo optimo
   * Para utilizar la validacion, solo hay que incluirla en los validadores del
   * FormsControl cuando defienes el formulario.
   */
  validacionPersonalizada(control: FormControl ): {[s: string]: boolean} {
    // control.value nos devuelve el valor del input
    if (String(control.value).startsWith('c', 0)) {
      return {comienzoApellido: true};
    }

    return null;
  }

  /**
   * Validacion personalizada.
   * Si el password1 y el password2 son diferentes no pasa la validacion.
   * @param control Recibe como parametro el valor del input
   * @returns Devuelve un objeto con la estructura {[s: string]: boolean}
   * Se puede dar any al tipo de retorno, pero indicar el tipo es lo optimo
   * Para utilizar la validacion, solo hay que incluirla en los validadores del
   * FormsControl cuando defienes el formulario.
   */
  validacionNoIgual(control: FormControl ): {[s: string]: boolean} {

    const formulario: any = this;

    console.log('formulario:', formulario, 'value:', control.value);

    if (control.value !== formulario.controls.password1.value) {
      return {passwordNoIguales: true};
    }
    console.log('iguales');

    return null;
  }

/**
 * Funcion de validacion asincrona
 * Si el username es Strider, marca como error el campo
 * @param control Recibe como parametro el valor del input
 * @returns Devuelve una promesa o un observable de tipo any
 * Se puede dar any al tipo de retorno, pero indicar el tipo es lo optimo
 * Para utilizar la validacion, solo hay que incluirla en los validadores del
 * FormsControl cuando defienes el formulario.
 */
  existeUsuario(control: FormControl): Promise<any> | Observable<any> {
    const promesa = new Promise( (resolve, reject) => {
      setTimeout( () => {
        if (control.value === 'Strider') {
          resolve ( {existe: true});
        } else {
          resolve (null);
        }

      }, 3000);
    });

    return promesa;
  }

}
