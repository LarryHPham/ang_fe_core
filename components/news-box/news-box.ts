import {Component, Input, ElementRef} from '@angular/core';
import { Larousel } from '../larousel/larousel';
import { LineChartComponent } from '../line-chart/line-chart.component';

declare var moment:any;

@Component({
    selector: 'news-box',
    templateUrl: './app/fe-core/components/news-box/news-box.html',
})

export class NewsBox{
  @Input() graphData: any;
  @Input() videoData: any;
  @Input() carData: any;
  private displayedItems: any;
  private currentDisplayed: any;

  constructor(private _elRef: ElementRef){

  }

  checkCurrent(item){
    this.currentDisplayed = item;
  }

  displayArray(event){
    if(event != null){
      this.displayedItems = event;
    }
  }
}
