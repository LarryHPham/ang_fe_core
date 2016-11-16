import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ScheduleBox} from '../../components/schedule-box/schedule-box.component';
import {SideScroll} from '../../components/carousels/side-scroll/side-scroll.component';
import {GlobalSettings} from '../../../global/global-settings';

@Component({
    selector: 'side-scroll-schedules',
    templateUrl: './app/fe-core/modules/side-scroll-schedules/side-scroll-schedules.module.html',
    outputs: ['count']
})

export class SideScrollSchedule{
  @Input() sideScrollData: any;
  @Input() scrollLength: any;
  @Input() scope:string;
  @Input() scopeDisplayed:string;
  @Output() changeScope = new EventEmitter();

  public count = new EventEmitter();
  public curCount = 0;
  _sportLeagueAbbrv: string = GlobalSettings.getSportLeagueAbbrv();
  _collegeDivisionAbbrv: string = GlobalSettings.getCollegeDivisionAbbrv();
  _collegeDivisionFullAbbrv: string = GlobalSettings.getCollegeDivisionFullAbbrv();

  counter(event){
    this.curCount = event;
    this.count.emit(event);
  }

  scopeChange(selection) {
    this.changeScope.next(selection);
  }
}
