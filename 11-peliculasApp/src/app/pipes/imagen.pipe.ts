import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  urlApi = 'https://image.tmdb.org/t/p';
  urlNoImagen = '../../assets/img/noimage.jpg';

  transform(img: string, size: number): any {

    if (img) {
      return `${this.urlApi}/w${size}/${img}`;
    } else {
      return this.urlNoImagen;
    }

  }

}
