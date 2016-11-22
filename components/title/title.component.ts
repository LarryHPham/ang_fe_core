import {Component, Input, Output, OnChanges, EventEmitter} from '@angular/core';
import {CircleImage} from '../../components/images/circle-image/circle-image';
import {ImageData, CircleImageData} from '../../components/images/image-data';
import {GlobalSettings} from '../../../global/global-settings';
// import {SeoService} from '../../../seo.service';

export interface TitleInputData {
    imageURL  : string;
    imageRoute?: Array<any>;
    text1     : string;
    text2     : string;
    text3     : string;
    text4?     : string;
    icon      : string;
}

@Component({
    selector: 'title-component',
    templateUrl: './app/fe-core/components/title/title.component.html',
})
export class TitleComponent implements OnChanges {
    @Input() titleData: TitleInputData;

    public titleImage: CircleImageData;
    @Input() runMeta:boolean;

    constructor(
    ){

    }

    ngOnInit(){
      this.runMeta = this.runMeta != null ? this.runMeta:true;
      if(this.runMeta){
        //create meta description that is below 160 characters otherwise will be truncated
        let text3 = this.titleData.text3 != null ? this.titleData.text3: '';
        let text4 = this.titleData.text4 != null ? '. '+this.titleData.text4: '';
        let title = text3 + ' ' + text4;
        let metaDesc = text3 + ' ' + text4 + ' as of ' + this.titleData.text1;
        let link = window.location.href;
        let imageUrl;
  	    if(this.titleData.imageURL != null && this.titleData.imageURL != ""){
  	       imageUrl = this.titleData.imageURL;
  	    }else{
  	       imageUrl = GlobalSettings.getmainLogoUrl();
  	    }
        // this._seoService.setCanonicalLink(this._params.params, this._router);
        // this._seoService.setOgTitle(title);
        // this._seoService.setOgDesc(metaDesc +". Know more about football.");
        // this._seoService.setOgType('Website');
        // this._seoService.setOgUrl(link);
        // this._seoService.setOgImage(imageUrl);
        // this._seoService.setTitle(title);
        // this._seoService.setMetaDescription(metaDesc);
        // this._seoService.setMetaRobots('INDEX, FOLLOW');
      }
    }


    ngOnChanges() {
        if(!this.titleData){
            this.titleData =
            {
                imageURL : GlobalSettings.getSiteLogoUrl(),
                imageRoute: null,
                text1: "lorem ipsum delor",
                text2: "ipsum delor lorem",
                text3: "lorem ipsum delor",
                text4: "lorem ipsum delor",
                icon: 'fa fa-map-marker'
            };
        }

        var hoverText = this.titleData.imageRoute ? "<p>View</p><p>Profile</p>" : "";
        this.titleImage = {
            imageClass: "page-title-titleImage",
            mainImage: {
                imageUrl: ( this.titleData.imageURL ? this.titleData.imageURL : GlobalSettings.getSiteLogoUrl() ),
                urlRouteArray: this.titleData.imageRoute,
                hoverText: hoverText,
                imageClass: "border-2"
            }
        };

        // if ( this.imageData ) {
        //     this.titleImage.mainImage = this.imageData;
        // }
    }


}
