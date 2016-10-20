import {Component, OnInit, Input} from '@angular/core';
import {GlobalSettings} from "../../../global/global-settings";

@Component({
    selector: 'footer-component',
    templateUrl: './app/fe-core/components/footer/footer.component.html',
})
export class FooterComponent implements OnInit {
    @Input() partner: string;
    pageName: string;
    currentUrl: string = window.location.href;
    _siteTwitterUrl: string = GlobalSettings.getSiteTwitterUrl(this.currentUrl);
    _siteFacebookUrl: string = GlobalSettings.getSiteFacebookUrl(this.currentUrl);
    _siteGoogleUrl: string = GlobalSettings.getSiteGoogleUrl(this.currentUrl);
    au: string = "About Us";
    service: string = "Terms of Service";
    privacy: string = "Privacy Policy";
    logoUrl: string = 'app/public/TCX_Logo_Outlined_White.svg';
    copyRight: string;
    loadData(partner: string) {
      var checkPartner = GlobalSettings.getHomeInfo().isPartner;
      if(!partner && !checkPartner) {
          this.pageName = GlobalSettings.getBaseTitle();
     } else {
          this.pageName = GlobalSettings.getBasePartnerTitle();
      }
    }
    ngOnInit() {
        this.copyRight = "Copyright " + GlobalSettings.getEstYear() + ", TCX. Inc."
        this.loadData(this.partner);
    }
}
