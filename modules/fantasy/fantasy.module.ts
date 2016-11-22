import { Component, Input, OnChanges }  from "@angular/core";

//interfaces
import { ModuleHeaderData } from "../../components/module-header/module-header.component";
import { GlobalSettings } from "../../../global/global-settings";

declare var jQuery:any;

@Component({
    selector: 'fantasy-module',
    templateUrl: './app/fe-core/modules/fantasy/fantasy.module.html'
})

export class FantasyModule implements OnChanges {
    @Input() fantasyDate;
    @Input() fantasyData;
    @Input() profHeader;
    articleUrl:Array<any>;
    footerData:any;
    modHeadData:ModuleHeaderData;
    isError:boolean = false;
    isSmall:boolean = false;
    backgroundImage:string;
    profileImage:string;

    getFantasyData() {
        try {
            this.backgroundImage = GlobalSettings.getImageUrl(this.fantasyData['article_data']['images'][0].image_url);
            this.profileImage = GlobalSettings.getImageUrl(this.fantasyData['article_data'].headshot_image);
            this.articleUrl = ['Article-pages', {
                eventType: 'player-fantasy',
                eventID: this.fantasyData['article_id']
            }];
            this.modHeadData = {
                moduleTitle: "Fantasy Report - " + this.profHeader.profileName,
                hasIcon: false,
                iconClass: '',
            };
            this.footerData = {
                infoDesc: 'Want to see more of the Fantasy Report?',
                text: 'VIEW FANTASY REPORT',
                url: this.articleUrl,
                smalltext: 'READ MORE'
            };
        } catch (e) {
            this.isError = true;
        }
    }

    ngOnChanges() {
        if (this.fantasyData) {
            this.getFantasyData();
        }
    }
}
