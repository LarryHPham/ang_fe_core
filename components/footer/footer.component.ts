import {Component, OnInit, Input} from '@angular/core';
import {GlobalSettings} from "../../../global/global-settings";

@Component({
    selector: 'footer-component',
    templateUrl: './app/fe-core/components/footer/footer.component.html',
})
export class FooterComponent implements OnInit {
    @Input() partner: string;
    public pageName: string;
    public homePageLinkName: string;
    public linkName: string;
    public currentUrl: string = window.location.href;
    public _siteTwitterUrl: string = GlobalSettings.getSiteTwitterUrl();
    public _siteFacebookUrl: string = GlobalSettings.getSiteFacebookUrl();
    public _siteGoogleUrl: string = GlobalSettings.getSiteGoogleUrl(this.partner);
    public _lastUpdated: string = " Copyright 2016, TCX. Inc.";
    public advertise: string = "Advertise with ";
    public au: string = "About Us";
    public service: string = "Terms of Service";
    public privacy: string = "Privacy Policy";
    public logoUrl: string = 'app/public/TCX_Logo_Outlined_White.svg';
    public copyRight: string;
    loadData(partner: string) {
      var checkPartner = GlobalSettings.getHomeInfo().isPartner;
      if(!partner && !checkPartner) {
          this.pageName = GlobalSettings.getBaseTitle();
          // this._lastUpdated = " Copyright " + GlobalSettings.getEstYear() + " " + GlobalSettings.getBaseTitle() + ", Inc.";
          this.advertise += this.pageName;
     } else {
          this.pageName = GlobalSettings.getBasePartnerTitle();
          // this._lastUpdated += " " + GlobalSettings.getBasePartnerTitle();
      }
    }
    ngOnInit() {
        this.copyRight = "Copyright " + GlobalSettings.getEstYear() + ", TCX. Inc."
        this.loadData(this.partner);
    }
}
