import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styles: []
})
export class PaisesComponent implements OnInit {

  public paises: any = [];

  constructor( private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://restcountries.eu/rest/v2/lang/es')
      .subscribe( ( paises ) => {
        this.paises = paises;
        console.log(paises);
      }
    );
  }


  drop(evento: CdkDragDrop<any> ) {
    console.log(evento);
    moveItemInArray( this.paises, evento.previousIndex, evento.currentIndex);
  }


}
