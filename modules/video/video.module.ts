import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {ModuleHeader, ModuleHeaderData} from '../../components/module-header/module-header.component';
import {GlobalFunctions} from '../../../global/global-functions';
//import {CircleButton} from "../../components/buttons/circle/circle.button";
import {VideoStackComponent} from "../../components/video-stack/video-stack.component";
import {DeepDiveService} from "../../../services/deep-dive.service";
//import {NgStyle, NgClass} from "@angular/common"
import {LoadingComponent} from "../../components/loading/loading.component";
import {DomSanitizationService, SafeResourceUrl} from "@angular/platform-browser";


@Component({
    selector: 'video-module',
    templateUrl: './app/fe-core/modules/video/video.module.html',
    directives:[ModuleHeader, VideoStackComponent, LoadingComponent],
})

export class VideoModule implements OnInit,OnChanges{
    @Input() isProfilePage:boolean;
    @Input() videoData:any;
    @Input() profileHeader;
    //videoCount:number=0;
    @Input() firstVideo:string;

    embedUrl:SafeResourceUrl;
    @Input() geoLocation;


    modHeadData: ModuleHeaderData;
    constructor( private _sanitizer: DomSanitizationService){

    }

    /*private getDeepDiveVideoBatch(numItems, startNum, region?){
        this._deepDiveData.getDeepDiveVideoBatchService(numItems, startNum).subscribe(
            data => {
                this.videoData = data.data;
            }
        )
    }*/
    ngOnInit(){
        this.embedUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.firstVideo);
    };

    ngOnChanges(){
        if(this.isProfilePage){
            this.modHeadData = {
                moduleTitle: "Videos<span class='mod-info'> -"+this.profileHeader.profileName+" </span>",
                hasIcon: false,
                iconClass: '',
            };
        }
    }

    // Scroll function to navigate through the next videos
    /*prev()
    {

        this.videoCount--;
        this.myUrl=  this.videoData[this.videoCount].videoLink;
        this.embedUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.myUrl);
    }
    next()
    {

        this.videoCount++;
        this.myUrl=  this.videoData[this.videoCount].videoLink;
        this.embedUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.myUrl);

    }
    //custom event to grab the index of the video click in the video-stack component
    getRowIndex(index){
        this.videoCount=index;
        this.myUrl=  this.videoData[this.videoCount].videoLink;
        this.embedUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.myUrl);
    }*/

}
