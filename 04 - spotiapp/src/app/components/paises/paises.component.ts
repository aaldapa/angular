import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styles: []
})
export class PaisesComponent implements OnInit {

  paises: any[] = [];

  constructor( private http: HttpClient) {

    // console.log();
    this.http.get('https://restcountries.eu/rest/v2/lang/es').subscribe( (resp: any) => {
      this.paises = resp;
      console.log(this.paises);
    });
  }

  ngOnInit() {
  }

}
