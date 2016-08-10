import {Component, Input, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {GlobalSettings} from "../../../global/global-settings";

export interface MenuData{
  menuTitle: string,
  url: any,
}

@Component({
    selector: 'hamburger-menu-component',
    templateUrl: './app/fe-core/components/hamburger-menu/hamburger-menu.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [],
})

export class HamburgerMenuComponent implements OnInit {
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

    this.menuData = [{
        menuTitle: "Home",
        url: ['Home-page']
      },
      {
        menuTitle: division + " Teams",
        url: ['Pick-team-page']//todo
      },
      {
        menuTitle: division + " Players",
        url: ['Directory-page-starts-with', {type: "players", startsWith: "a", page: "1"}]//todo
      },
      {
        menuTitle: division + " League",
        url: ['MLB-page']//todo
      },
      {
        menuTitle: division + " Schedule",
        url: ['Schedules-page-league', {pageNum:1}]//todo
      },
      {
        menuTitle: division + " Standings",
        url: ['Standings-page-league', {type: division}]
    }];
    this.menuInfo = [{
        menuTitle: "About Us",
        url: ['About-us-page']
      },
      {
        menuTitle: "Contact Us",
        url: ['Contact-us-page']
      },
      {
        menuTitle: "Disclamer",
        url: ['Disclaimer-page']
    }];
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
