import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apikey = 'AIzaSyCZBZxv7IVIWWzusYvM8cu_gtVrJCyYkC4';

  userToken: string;

  constructor( private http: HttpClient) {
    this.leerToken();
   }

  // crear nuevos usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  nuevoUsuario( usuario: UsuarioModel) {
    /*
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken : true
    };
    */
    // Tambien podemos crear el objeto aprovechando el usuarioModel de esta forma
    const authData = {
      ...usuario,
      returnSecureToken : true
    };

    return this.http.post(
      `${this.url}/accounts:signUp?key=${this.apikey}`, authData)
        .pipe(
          map( (resp: any) => {
            this.guardarToken( resp.idToken , resp.expiresIn);
            return resp;
          })
        );
  }

  // login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  login( usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken : true
    };

    return this.http.post(
      `${this.url}/accounts:signInWithPassword?key=${this.apikey}`, authData)
        .pipe(
          map( (resp: any) => {
            console.log(resp);
            this.guardarToken( resp.idToken , resp.expiresIn);
            return resp;
          })
      );
  }
    logout() {
      localStorage.removeItem( 'token');
    }


  // guarda el token recibido en el localstorage
  private guardarToken( idToken: string, expiresIn: number) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    const hoy = new Date();
    hoy.setSeconds(expiresIn);
    localStorage.setItem ('expiracion', hoy.getTime().toString());
  }

  leerToken() {

    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean {
    if (this.userToken.length <= 0) {
      return false;
    }

    const expira = new Date(Number(localStorage.getItem('expiracion')));

    if ( expira >= new Date()) {
      return true;
    } else {
      return false;

    }
  }

}
