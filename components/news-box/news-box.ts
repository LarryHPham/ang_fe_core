import {Component, Input, ElementRef, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { Larousel } from '../larousel/larousel';
import { LineChartComponent } from '../line-chart/line-chart.component';

@Component({
    selector: 'news-box',
    templateUrl: './news-box.html',
})

export class NewsBox{
  @Input() graphData: any;
  @Input() videoData: any;
  @Input() carData: any;
  @Input() toggleData: any;

  @Output() changeScope = new EventEmitter();
  private displayedItems: any;
  private currentDisplayed: any;

  constructor(private _elRef: ElementRef, private router: Router){}

  checkCurrent(item){
    this.currentDisplayed = item;
  }

  displayArray(event){
    if(event != null){
      this.displayedItems = event;
    }
  }

  routeNavigate($event) {
      this.changeScope.next($event);
  }

  articleNavigate(event){
    this.router.navigate(event);
  }
}
