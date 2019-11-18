import { Component, OnInit, Input } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input()
  tabActual: string;

  constructor( public deseosService: DeseosService,
               private router: Router) { }

  ngOnInit() {}

  verLista(listaId: number) {
    this.router.navigateByUrl(`/tabs/${this.tabActual}/agregar/${listaId}`);
  }
}
