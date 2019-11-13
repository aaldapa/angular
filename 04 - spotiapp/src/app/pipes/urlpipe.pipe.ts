import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'urlpipe'
})
export class UrlpipePipe implements PipeTransform {

  constructor( private domSanitizer: DomSanitizer) { }

  transform( value: any): any {
    const url = 'https://open.spotify.com/embed?uri=';
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url + value);
  }

}
