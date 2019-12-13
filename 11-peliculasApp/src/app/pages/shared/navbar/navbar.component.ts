import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  // terminoBusqueda: string;

  constructor( private router: Router) {

  }


  ngOnInit() { }


  buscarPeliculas( term: string) {
    this.router.navigate(['/buscar', term]);

  }

}
