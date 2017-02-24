import { Component, OnInit, Input } from '@angular/core';
import { isBrowser } from 'angular2-universal';

@Component({
  selector: 'share-links-component',
  templateUrl: './share-links.component.html'
})

export class ShareLinksComponent implements OnInit {
  @Input() shareUrl:string;
  @Input('server_render') showOnClient:boolean = false;
  shareLinks:Array<any>;

  getLinks() {
    this.shareLinks = [
      {
        type: "facebook",
        link: this.shareUrl,
        fontAwesome: "facebook"
      },
      {
        type: "twitter",
        link: this.shareUrl,
        fontAwesome: "twitter"
      },
      {
        type: "linkedIn",
        link: this.shareUrl,
        fontAwesome: "linkedin"
      },
      {
        type: "googleplus",
        link: this.shareUrl,
        fontAwesome: "fontawesome-webfont"
      }
    ];
  }

  ngOnInit() {
    if (isBrowser) {
      this.showOnClient = true;
      this.getLinks();
    }
  }

  ngOnChanges() {
    if (typeof this.shareUrl != 'undefined') {
      this.getLinks();
    }
  }
}
