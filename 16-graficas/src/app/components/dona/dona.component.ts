import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: []
})
export class DonaComponent implements OnInit {

    // Doughnut
    public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData: MultiDataSet = [
      [350, 450, 100],
      [50, 150, 120],
      [250, 130, 70],
    ];
    public doughnutChartType: ChartType = 'doughnut';

    constructor() { }

    ngOnInit() {
    }

    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }

    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }

    public randomize(): void {
      // Only Change 3 values
      const data = [
        Math.round(Math.random() * 100),
        59,
        80,
        Math.round((Math.random() * 100)),
        56,
        Math.round((Math.random() * 100)),
        40];

      this.doughnutChartData = [ data ];
    }
}
