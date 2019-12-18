import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { FileItem } from '../models/file-items';

@Injectable({
  providedIn: 'root',
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';

  constructor( private db: AngularFirestore) { }


  public cargarImagenesFirebase( imagenes: FileItem []) {
    const storageRef = firebase.storage().ref();

    for (const item of imagenes) {

      item.estaSubiendo = true;
      if (item.progreso >= 100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask =
            storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`)
                .put (item.archivo);

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
        ( snapshot: firebase.storage.UploadTaskSnapshot ) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 , 
        ( error) => console.error('Error al subir', error),
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(
            (downloadURL) => {

              console.log( 'Imagen cargada correctamente' );
              item.url = downloadURL;

              item.estaSubiendo = false;
              this.guardarImage( {
                nombre: item.nombreArchivo,
                url: item.url});

            });

        });
    }

  }

  private guardarImage(image: {nombre: string, url: string}) {

    this.db.collection(`/${this.CARPETA_IMAGENES}`)
      .add( image);
  }

}
