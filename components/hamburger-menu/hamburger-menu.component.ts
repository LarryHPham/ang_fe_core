import {Component, Input, OnInit} from '@angular/core';
import {GlobalSettings} from "../../../global/global-settings";
import {HamburgerDeliveryService} from '../../../services/hamburger-delivery.service';

export interface MenuData{
  menuTitle: string,
  url: any,
}

@Component({
    selector: 'hamburger-menu-component',
    templateUrl: './app/fe-core/components/hamburger-menu/hamburger-menu.component.html',
    providers: [HamburgerDeliveryService],
})

export class HamburgerMenuComponent implements OnInit {
  @Input() partnerID:string;
  @Input() scope: string;
  public menuData: any;
  public menuInfo: any;
  // public _sportLeagueAbbrv: string = GlobalSettings.getSportLeagueAbbrv().toUpperCase();
  // public _collegeDivisionAbbrv: string = GlobalSettings.getCollegeDivisionAbbrv().toUpperCase();
  // public _collegeDivisionFullAbbrv: string = GlobalSettings.getCollegeDivisionFullAbbrv().toUpperCase();
  public isHome:any;
  constructor(){
    this.isHome = GlobalSettings.getHomeInfo().isHome;
  }
  ngOnInit(){
    this.loadData();
    // this.scope = this.scope.toUpperCase();
    // if (this.scope == this._collegeDivisionAbbrv) {this.scope = this._collegeDivisionFullAbbrv;}
    // this.changeActiveLeague(this.scope);
  }//ngOnInit ends
  loadData() {
    var data = HamburgerDeliveryService.createMenu();
    this.menuData = data.menuData;
    this.menuInfo = data.menuInfo;
  }//loadData ends
  toggleNest(event) {
    if (event.target.innerHTML == "+") {
      event.target.parentElement.classList.add('open');
      event.target.innerHTML = "x"
    }
    else {
      event.target.parentElement.classList.remove('open');
      event.target.innerHTML = "+"
    }

  }
}
