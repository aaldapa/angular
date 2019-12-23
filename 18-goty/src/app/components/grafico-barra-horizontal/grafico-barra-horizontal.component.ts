import { Component, OnDestroy, Input} from '@angular/core';

@Component({
  selector: 'app-grafico-barra-horizontal',
  templateUrl: './grafico-barra-horizontal.component.html',
  styles: []
})
export class GraficoBarraHorizontalComponent implements OnDestroy {

  // results: any[] = [
  //   {
  //     name: 'Juego 1',
  //     value: 20
  //   },
  //   {
  //     name: 'Juego 2',
  //     value: 25
  //   },
  //   {
  //     name: 'Juego 3',
  //     value: 15
  //   },
  //   {
  //     name: 'Juego 4',
  //     value: 30
  //   }
  // ];
  @Input() results: any[] = [];
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Juegos';
  showYAxisLabel = true;
  yAxisLabel = 'Votoss';

  colorScheme = 'nightLights';


  intervalo;

  ngOnDestroy(): void {
    // clearInterval ( this.intervalo);
  }

  constructor() {

    // this.intervalo = setInterval( () => {

      const nuevosResultados = [... this.results];

      for ( const i in nuevosResultados) {
        if (nuevosResultados[i]) {
          nuevosResultados[i].value = Math.round(Math.random() * 100);
          console.log(nuevosResultados[i].value);
        }
      }

      this.results = [...nuevosResultados];

      // }, 1500);

   }

  onSelect(event) {
    console.log(event);
  }

}
