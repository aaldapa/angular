import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { Router } from '@angular/router';

// mensajes de alerta
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recuerdame = false;

  constructor( private auth: AuthService,
               private router: Router) { }


  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit( form: NgForm) {

    if (form.invalid) {
      return;
    }

    this.auth.nuevoUsuario(this.usuario)
      .subscribe(resp => {

        // cierro alerta
        Swal.close();

        if (this.recuerdame) {
          localStorage.setItem('recuerdame', this.usuario.email);
        }

        // redirijo a pagina
        this.router.navigateByUrl('/home');

      }, (err) => {

        const errorMsg: string = err.error.error.message;
        // muestro alerta error
        Swal.fire({
          allowOutsideClick: false,
          title: 'Error alta de usuario',
          text: errorMsg,
          icon: 'error'
        });
      });

  }


}
