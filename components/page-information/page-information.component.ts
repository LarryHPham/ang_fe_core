import { Component, Input } from '@angular/core';
import {GlobalSettings} from "../../../global/global-settings";

export interface infoData {
  title: string;
  lastUpdated: string;
  paragraph: Array<subInfoData>;
}
export interface subInfoData {
  subHeader: string;
  info: Array<string>;
}
declare var stButtons: any;

@Component({
  selector: 'information-component',
  templateUrl: './app/fe-core/components/page-information/page-information.component.html',
})

export class InfoComponent{
  @Input() infoData: infoData;
  currentUrl: string = window.location.href;
  // _siteTwitterUrl: string = GlobalSettings.getSiteTwitterUrl(this.currentUrl); //TODO - old
  _siteTwitterUrl: string = GlobalSettings.getSiteTwitterUrl();
  // _siteFacebookUrl: string = GlobalSettings.getSiteFacebookUrl(this.currentUrl);//TODO - old
  //_siteLinkedinUrl: string = GlobalSettings.getLinkedInUrl(this.currentUrl);//TODO - old
  _siteGoogleUrl: string = GlobalSettings.getSiteGoogleUrl(this.currentUrl);
  public locateShareThis = function(){
    stButtons.locateElements();
  };
}
