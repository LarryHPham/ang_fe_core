import {Component, Input, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {GlobalSettings} from "../../../global/global-settings";
import {HamburgerDeliveryService} from '../../../services/hamburger-delivery.service';

export interface MenuData{
  menuTitle: string,
  url: any,
}

@Component({
    selector: 'hamburger-menu-component',
    templateUrl: './app/fe-core/components/hamburger-menu/hamburger-menu.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HamburgerDeliveryService],
})

export class HamburgerMenuComponent implements OnInit {
  @Input() partnerID:string;
  public menuData: any;
  public menuInfo: any;
  public _sportLeagueAbbrv: string = GlobalSettings.getSportLeagueAbbrv();
  public _collegeDivisionAbbrv: string = GlobalSettings.getCollegeDivisionAbbrv();
  public menuInfoHeader: string = "Company Info";
  public isHome:any;
  constructor(){
    this.isHome = GlobalSettings.getHomeInfo().isHome;
  }
  ngOnInit(){
    this.loadData(this._sportLeagueAbbrv);
  }//ngOnInit ends
  loadData(division) {
    var data = HamburgerDeliveryService.createMenu(division, this.partnerID);
    this.menuData = data.menuData;
    this.menuInfo = data.menuInfo;
  }//loadData ends
  changeActiveLeague(division, event){
    this.loadData(division);
    var buttons = document.getElementsByClassName("hamburger-division-select-button");
    var i;
    for (i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }
    event.target.classList.add("active");
  }
}
