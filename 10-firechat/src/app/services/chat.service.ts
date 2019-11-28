import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Mensaje } from '../interfaces/mensaje.interface';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];

  public usuario: any = {};

  constructor( private afs: AngularFirestore,
               public afAuth: AngularFireAuth ) {

   // Suscripcion para ver cualquier cambio que suceda en el estado de la autenticacion
   this.afAuth.authState.subscribe( (resp: any) => {
      console.log('Estado del usuario', resp);

      // La primera vez que nos logamos la resp que es igual al usuario, será null
      if (!resp) {
        return;
      }

      // Si existe el usuario:
      this.usuario.nombre = resp.displayName;
      this.usuario.uid = resp.uid;

      console.log(this.usuario);

    });

  }


  login( proveedor: string ) {

    if (proveedor === 'google') {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }

  }

  logout() {
    this.afAuth.auth.signOut();
    this.usuario = {};
  }

  cargarMensajes() {

    this.itemsCollection = this.afs.collection<Mensaje>('chats'
    // ref es una referencia mensaje de la coleccion y la api nos permite mandar una query ordenada por fecha
    , ref => {
        return ref.orderBy('fecha', 'desc')
               .limit(5);
      });

    return this.itemsCollection.valueChanges().pipe(
      map( (mensajes: Mensaje[]) => {
        // para ordenar de forma inversa los 5 ultimos elementos del array de mensajes
        this.chats = [];
        for (const item of mensajes) {
          // añade el elemento en la posicion 0 corriendo el resto de elementos
          this.chats.unshift(item);
        }

        // console.log(mensajes);

        // opcional hacer un return para seguir trabajando con this.chats en otra funcion
        return this.chats;

      })
    );
  }


  agregarMensaje( texto: string) {

    // falta el UID del usuario
    const mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };

    return this.itemsCollection.add( mensaje );
  }



}
