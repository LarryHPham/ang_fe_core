import {Component, AfterViewInit, Input, Inject, ElementRef} from '@angular/core';
import { isBrowser } from 'angular2-universal';

declare var jQuery:any;
declare var Highcharts:any;

@Component({
  selector: 'line-chart',
  templateUrl: './app/fe-core/components/line-chart/line-chart.component.html'
})

export class LineChartComponent implements AfterViewInit {
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
      var chartWrapper = document.getElementById('newsbox-chart-container');
      Highcharts.chart(chartWrapper, this.options);
    }
  }
}
