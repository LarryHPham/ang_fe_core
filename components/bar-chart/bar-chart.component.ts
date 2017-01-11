import { Component, AfterViewInit, Input, Inject, ElementRef } from '@angular/core';
import { isBrowser } from 'angular2-universal';

declare var jQuery:any;
declare var highcharts:any;

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html'
})

export class BarChartComponent implements AfterViewInit {
  @Input() options: any;

  private _elementRef: ElementRef;

  constructor(@Inject(ElementRef) elementRef: ElementRef) {
    this._elementRef = elementRef;
  }

  ngAfterViewInit() {
    this.drawChart();
  }

  drawChart() {
    if(isBrowser && this.options){
      var chartWrapper = document.getElementById('daily-update-chart-container');
      highcharts.chart(chartWrapper, this.options);
    }
  }
}
