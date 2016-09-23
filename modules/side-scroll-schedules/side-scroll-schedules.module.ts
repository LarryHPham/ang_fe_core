import {Component, Input, Output, EventEmitter} from '@angular/core';
declare var jQuery:any;

@Component({
    selector: 'side-scroll-schedules',
    templateUrl: './app/fe-core/modules/side-scroll-schedules/side-scroll-schedules.module.html',
    outputs: ['count']
})

export class SideScrollSchedule{
  @Input() sideScrollData: any;
  @Input() scrollLength: any;
  @Input() scope:string;
  @Output() changeScope = new EventEmitter();

  public count = new EventEmitter();
  public curCount = 0;
  _sportLeagueAbbrv: string = "pro_div";
  _collegeDivisionAbbrv: string = "col_div";
  _collegeDivisionFullAbbrv: string = "col_div_full";

  counter(event){
    this.curCount = event;
    this.count.emit(event);
  }

  scopeChange(selection) {
    this.changeScope.next(selection);
  }
}
