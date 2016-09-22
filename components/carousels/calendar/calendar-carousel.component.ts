import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';

import {BoxScoresService} from '../../../../services/box-scores.service';
import {GlobalFunctions} from '../../../../global/global-functions';
import {GlobalSettings} from '../../../../global/global-settings';

declare var moment;

export interface weekDate {
  unixDate:any;
  fullDate:string;
  active:boolean;
  clickable:boolean;
  year:any;
  month:any;
  day:any;
  weekDay:string;
  ordinal:string;
}

@Component({
    selector: 'calendar-carousel',
    templateUrl: './app/fe-core/components/carousels/calendar/calendarCar.component.html'
})

export class CalendarCarousel implements OnInit{
  ngOnInit() {}
}
