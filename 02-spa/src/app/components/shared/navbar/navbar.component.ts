import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router ) {  }

  ngOnInit() { }

  /* redireccion a findedheroes pasando el termino de busqueda
     para que obtenga la lista de heroes a mostrar */
  findHeroes(term: string): void {
    this.router.navigate(['/findedheroes', term]);
  }

}
