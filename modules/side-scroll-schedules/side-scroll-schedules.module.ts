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
  @Input() topScope:string;
  @Input() scope:string;
  @Input() scopeList:string;
  @Output() changeScope = new EventEmitter();
  titleText:string = "";
  titleIcon:string = "";

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
  selectCity(event) {
    //return the zip code for the clicked on city
    console.log("Zip Code:", event.target.id);
  }
  ngOnInit() {
    switch(this.topScope) {
    case "weather":
      this.titleText = "84° <span class='weather-divider'>|</span> Chicago, IL"
      this.titleIcon = "http://images.synapsys.us/weather/icons/sharknado_d.svg";
        break;
    case "finance":
      this.titleText = "Market Movers: <span class='hide-mobile'>All Exchanges</span>"
      this.titleIcon = "fa-briefcase-case-two";
        break;
    case "football":
    case "sports":
    case "basketball":
    case "baseball":
      this.titleIcon = "fa-calendar-1";
      this.titleText = "Upcoming Games"
        break;
    default:

}
  }
}
