import {Component, OnInit, Inject, Input} from '@angular/core';
import {GlobalSettings} from "../../../global/global-settings";
import { DOCUMENT } from '@angular/platform-browser';
import { isBrowser } from 'angular2-universal';

declare var DISQUS: any;

@Component({
    selector: 'disqus-component',
    templateUrl: './app/fe-core/components/disqus/disqus.component.html',
})

export class DisqusComponent implements OnInit{
    @Input() comment:any;

    private _document: Document;
    constructor(@Inject(DOCUMENT) private document: Document){ this._document = document }

    ngOnInit(){
      if(isBrowser){
        var script:any = this._document.createElement("script");
        // DisQus Plugin
        script.innerHTML = (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)){
            DISQUS.reset({
              reload: true,
              config: function () {
                this.page.identifier = (window.location.pathname + " ").replace("/"," ");
                this.page.url = window.location.href + "#!newthread";
              }
            });
          }else{
            js = d.createElement(s); js.id = id;
            js.src = "//"+ GlobalSettings.getHomePageLinkName()+".disqus.com/embed.js";
            fjs.parentNode.insertBefore(js, fjs);
          }
        }(this._document, 'script', 'disqusJS'));

        this._document.body.appendChild(script);
      }
    }
}
