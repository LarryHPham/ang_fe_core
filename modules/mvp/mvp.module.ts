import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
import {Injectable} from '@angular/core';

import {ModuleFooter, ModuleFooterData} from '../../components/module-footer/module-footer.component';
import {ModuleHeader, ModuleHeaderData} from '../../components/module-header/module-header.component';
import {MVPListComponent, MVPTabData} from '../../components/mvp-list/mvp-list.component';
import {LoadingComponent} from '../../components/loading/loading.component';

import {GlobalSettings} from "../../../global/global-settings";
import {VerticalGlobalFunctions} from "../../../global/vertical-global-functions";

@Component({
    selector: 'mvp-module',
    templateUrl: './app/fe-core/modules/mvp/mvp.module.html',
    directives: [MVPListComponent, ModuleHeader, ModuleFooter, LoadingComponent],
    providers: [],
    inputs:['mvpData', 'title']
})

export class MVPModule implements OnInit {
  @Output() tabSelectedListener = new EventEmitter();
  @Output() dropdownPositionSelection = new EventEmitter();

  @Input() mvpData: Array<MVPTabData>;

  @Input() title: string;

  @Input() query: any;

  modHeadData: ModuleHeaderData;

  footerData: ModuleFooterData;

  tabKey: string;

  public scope: string;
  public sportLeagueAbbrv: string = GlobalSettings.getSportLeagueAbbrv().toLowerCase();
  public collegeDivisionAbbrv: string = GlobalSettings.getCollegeDivisionAbbrv();
  public collegeDivisionFullAbbrv: string = GlobalSettings.getCollegeDivisionFullAbbrv();

  ngOnChanges() {}

  ngOnInit() {
    this.displayData(this.query.scope, VerticalGlobalFunctions.convertPositionAbbrv(this.query.position));
  }

  displayData(scope, position){

    if ( scope == this.collegeDivisionAbbrv.toLowerCase() ) {
      scope = this.collegeDivisionFullAbbrv;
    }

    this.modHeadData = {
        moduleTitle: "Most Valuable Players",
        moduleIdentifier: " - "+scope.toUpperCase() + " " + position +"s",
        hasIcon: false,
        iconClass: '',
    };

    var type = this.query.statName.indexOf(position)>=0 ? position : "k";
    var url;

    url = ['MVP-list-tab-page', {
      type: this.query.position,
      tab: this.query.statName,
      pageNum: "1"
    }];
    
    this.footerData = {
      infoDesc: 'Want to see everybody involved in this list?',
      text: 'VIEW THE LIST',
      url: url
    };
  }

  tabSelected(tab) {
    this.displayData(this.query.scope, VerticalGlobalFunctions.convertPositionAbbrv(tab.tab.tabDataKey) );
    this.tabKey = tab.tab.tabDataKey;
    if (!tab.tab.listData) { //let the page handle the service call if there's no data
      this.tabSelectedListener.next(tab);
    }
    else {}
  }

  dropdownChanged($event) {
    this.displayData(this.query.scope, VerticalGlobalFunctions.convertPositionAbbrv($event.position) );
    this.dropdownPositionSelection.next($event);
  }
}
