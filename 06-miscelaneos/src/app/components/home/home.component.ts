import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked,
                    AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
// tslint:disable-next-line: no-conflicting-lifecycle
@Component({
  selector: 'app-home',
  template: `
    <app-ng-style></app-ng-style>

    <app-css></app-css>

    <app-ng-class></app-ng-class>

    <br>
    <h3 class="mt-4">Directivas</h3>
    <p appResaltado>
        Parrafo manipulado mediante directiva
    </p>
    <p #colorParaParrafo2 [appResaltado]="'orange'">
        Parrafo 2 manipulado mediante directiva y pasando desde el html el color que deseamos para el fondo
    </p>

    <app-ng-switch></app-ng-switch>
  `,
  styles: []
})
export class HomeComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, 
AfterViewInit, AfterViewChecked, OnDestroy {

  constructor() {
    console.log('Constructor');
  }

  ngOnInit() {
    console.log('OnInit');
  }

  ngOnChanges() {
    console.log('OnChanges');
  }

  ngDoCheck() {
    console.log('DoCheck');
  }
  ngAfterContentInit() {
    console.log('AfterContentInit');
  }
  ngAfterContentChecked() {
    console.log('AfterContentChecked,');
  }
  ngAfterViewInit() {
    console.log('AfterViewInit');
  }
  ngAfterViewChecked() {
    console.log('AfterViewChecked');
  }
  ngOnDestroy() {
    console.log('OnDestroy');
  }
}
