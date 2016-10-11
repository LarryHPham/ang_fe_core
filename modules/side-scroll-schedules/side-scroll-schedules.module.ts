import {Component, Input, Output, EventEmitter} from '@angular/core';
import { SchedulesService } from '../../../services/schedules.service';
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
  @Output() changeLocation = new EventEmitter();
  titleText:string = "";
  titleIcon:string = "";

  public count = new EventEmitter();
  public curCount = 0;
  keyPressReady: boolean = true;
  autocompleteItems: Array<any> = [];
  showError: boolean = false;

  constructor(private _schedulesService:SchedulesService) {}

  counter(event){
    this.curCount = event;
    this.count.emit(event);
  }

  scopeChange(selection) {
    this.changeScope.next(selection);
  }
  keypress(event) {
    var textEntered = event.target.value.replace(/ /g, "%20");

    if (this.keyPressReady == true && event.target.value != "") {
      this.keyPressReady = false;
      // call api now
      this._schedulesService.getLocationAutocomplete(textEntered, (data) => {

        if (data.success == true) {
          this.showError = false;
          this.autocompleteItems = data.data;
        }
        else {
          this.autocompleteItems = [];
          this.showError = true;
        }
      })
      setTimeout(() => {
        this.keyPressReady = true;
      }, 500);
    }
    if (event.target.value == "") {
      this.showError = false;
      this.autocompleteItems = [];
    }
  }
  selectCity(event) {
    //return the zip code for the clicked on city
    this.changeLocation.next(event.target.id);
    this.autocompleteItems = [];
  }
  ngOnChanges(event) {
    switch(this.topScope) {
    case "weather":
      this.titleText = "<span class='hide-mobile'>" + this.sideScrollData.current.currentTemperature + "°<span class='weather-divider'>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span></span>" + this.sideScrollData.current.city + ", " + this.sideScrollData.current.state;
      this.titleIcon = "http://images.synapsys.us" + this.sideScrollData.current.currentIcon;
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

  ngOnInit() {
    //Shhhh easter egg here. To activate: type "window.createSharknado()" in your browser console
    if (this.topScope == "weather") {
      window['createSharknado'] = function() {
          console.log("Preparing your sharknado...");
          var image = document.getElementsByClassName("condition-image");
          for (var i = 0; i < image.length; i++) {
            image[i]['src'] = "http://images.synapsys.us/weather/icons/sharknado_n.svg";
          }
          var condition = document.getElementsByClassName("condition");
          for (var u = 0; u < condition.length; u++) {
            condition[u]['innerHTML'] = "Sharknado!";
          }
          var temp = document.getElementsByClassName("temp");
          for (var v = 0; v < temp.length; v++) {
            temp[v]['innerHTML'] = "9001&#176;";
          }
      };
    }
  }
}
