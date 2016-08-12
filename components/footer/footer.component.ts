import {Component, OnInit, Input} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {GlobalFunctions} from '../../../global/global-functions';
import {MLBGlobalFunctions} from '../../../global/mlb-global-functions';
import {Link, NavigationData} from '../../../global/global-interface';
import {GlobalSettings} from "../../../global/global-settings";
import {DropdownDirectoryComponent} from '../dropdown-directory/dropdown-directory.component';
import {FooterService} from '../../../services/footer.service';
@Component({
    selector: 'footer-component',
    templateUrl: './app/fe-core/components/footer/footer.component.html',
    directives: [ROUTER_DIRECTIVES, DropdownDirectoryComponent],
    inputs: [],
    providers: [FooterService],
})
export class FooterComponent implements OnInit {
    @Input() partner: string;
    public pageName: string;
    public homePageLinkName: string;
    public linkName: string;
    public currentUrl: string = window.location.href;
    public _sportLeagueAbbrv: string = GlobalSettings.getSportLeagueAbbrv();
    public _copyrightInfo: string = GlobalSettings.getCopyrightInfo();
    public _siteTwitterUrl: string = GlobalSettings.getSiteTwitterUrl();
    public _siteFacebookUrl: string = GlobalSettings.getSiteFacebookUrl();
    public _siteGoogleUrl: string = GlobalSettings.getSiteGoogleUrl(this.partner);
    public _sportLeagueFull: string = GlobalSettings.getSportLeagueFull();
    public _lastUpdated: string = GlobalSettings.getEstYear();
    teamDirectoryListings: Array<Link> = [];

    playerDirectoryListings: Array<Link> = [];

    mlbTeamListings: Array<Link> = [];
    constructor(private _service: FooterService){//TODO
      this._service.getFooterService("nfl", "player")
      .subscribe(data => {
        // this.playerDirectoryListings = data;
      },
      err => {
        console.log("Error getting footer data");
      });
    }
    loadData(partner: string) {
      var checkPartner = GlobalSettings.getHomeInfo().isPartner;
      if(!partner && !checkPartner) {
          this.pageName = GlobalSettings.getBaseTitle();
          this._lastUpdated += " " + GlobalSettings.getBaseTitle();
     } else {
          this.pageName = GlobalSettings.getBasePartnerTitle();
          this._lastUpdated += " " + GlobalSettings.getBasePartnerTitle();
      }
    }

    ngOnInit() {
        this.loadData(this.partner);
        this.teamDirectoryListings = GlobalFunctions.setupAlphabeticalNavigation("teams");
        this.playerDirectoryListings = GlobalFunctions.setupAlphabeticalNavigation("players");
    }

}
