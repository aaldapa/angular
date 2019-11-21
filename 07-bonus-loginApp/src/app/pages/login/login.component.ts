import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

import { Router } from '@angular/router';
// mensajes de alerta
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recuerdame = false;

  constructor( private auth: AuthService,
               private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    if (localStorage.getItem('recuerdame')) {
      this.usuario.email = localStorage.getItem('recuerdame');
      this.recuerdame = true;
    }
  }

  login( form: NgForm ) {

    console.log(this.usuario);

    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon: 'info'
    });

    Swal.showLoading();

    // Llamada al servicio para hacer login
    this.auth.login(this.usuario)
      .subscribe(resp => {
        // cierro alerta
        Swal.close();

        if (this.recuerdame) {
          localStorage.setItem('recuerdame', this.usuario.email);
        }

        this.router.navigateByUrl('/home');

      }, (err) => {
        const errorMsg: string = err.error.error.message;
        // muestro alerta error
        Swal.fire({
          allowOutsideClick: false,
          title: 'Error de autenticación',
          text: errorMsg,
          icon: 'error'
        });
      });

    // console.log('imprimir si el formulario es valido');
  }

}
