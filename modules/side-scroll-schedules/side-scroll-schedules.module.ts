import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ScheduleBox} from '../../fe-core/components/schedule-box/schedule-box.component'
import {SideScroll} from '../../fe-core/components/carousels/side-scroll/side-scroll.component'

declare var jQuery:any;

@Component({
    selector: 'side-scroll-schedules',
    templateUrl: './app/fe-core/modules/side-scroll-schedules/side-scroll-schedules.module.html',
    directives: [ScheduleBox,SideScroll],
    outputs: ['count']
})

export class SideScrollSchedule{
  @Input() sideScrollData: any;
  @Input() scrollLength: any;
  public count = new EventEmitter();
  public curCount = 0;

  counter(event){
    this.curCount = event;
    this.count.emit(event);
  }

  ngOnChanges(){
  }
}
