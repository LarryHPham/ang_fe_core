import {Component, AfterContentChecked, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import { Larousel } from '../larousel/larousel';

declare var moment:any;

@Component({
    selector: 'news-box',
    templateUrl: './app/fe-core/components/news-box/news-box.html',
    outputs: ['carouselCount'],
})

export class NewsBox{
  @Input() videoData: any;
  @Input() carData: any;
  private displayedItems: any;


  displayArray(event){
    if(event != null){
      this.displayedItems = event;
    }
  }

 formatDate(date) {
   return moment(date, "YYYY-MM-Do, h:mm:ss").format("MMMM Do, YYYY h:mm:ss a");
 }
}
