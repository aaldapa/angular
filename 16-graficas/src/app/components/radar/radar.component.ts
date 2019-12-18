import { Component, OnInit } from '@angular/core';
import { ChartDataSets, RadialChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styles: []
})
export class RadarComponent implements OnInit {

  // Radar
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartData: ChartDataSets[] = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
  ];
  public radarChartType: ChartType = 'radar';

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
    const dataA = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round((Math.random() * 100)),
      56,
      Math.round((Math.random() * 100)),
      40];
    const dataB = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round((Math.random() * 100)),
      56,
      Math.round((Math.random() * 100)),
      40];

    this.radarChartData = [
      { data: dataA, label: 'Series A' },
      { data: dataB, label: 'Series B' }
    ];
  }
}
