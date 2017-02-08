import {Component, AfterViewInit, Input} from '@angular/core';
import { isBrowser } from 'angular2-universal';

declare var stButtons:any;

@Component({
    selector: 'share-links-component',
    templateUrl: './share-links.component.html'
})

export class ShareLinksComponent implements AfterViewInit {
    @Input() isMain:boolean;
    @Input() shareUrl:string;
    @Input('server_render') showOnClient: boolean = false;
    shareLinks:Array<any>;

    getLinks() {
        this.shareLinks = [
            {
                link: this.shareUrl,
                fontAwesome: "share-alt"
            },
            {
                link: "//www.facebook.com/sharer/sharer.php?u=" + this.shareUrl,
                fontAwesome: "facebook"
            },
            {
                link: "//twitter.com/home?status=" + this.shareUrl,
                fontAwesome: "twitter"
            },
            {
                link: "//www.linkedin.com/shareArticle?mini=true&url=" + this.shareUrl,
                fontAwesome: "linkedin"
            },
            {
                link: "//plus.google.com/share?url=" + this.shareUrl,
                fontAwesome: "g-plus"
            }
        ];
    }

    ngOnInit() {
      if(isBrowser){
        this.showOnClient = true;
        stButtons.locateElements();
      }
    }

    ngAfterViewInit() {
        if (typeof this.shareUrl != 'undefined') {
            this.getLinks();
        }
    }
}
