import {Component, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {SanitizeHtml} from "../../../pipes/safe.pipe";
import {SyndicatedArticlePage} from "../../../../webpages/syndicated-article-page/syndicated-article-page.page";


@Component({
    selector: 'recommendations-component',
    templateUrl: './app/fe-core/components/articles/recommendations/recommendations.component.html',
    directives: [ROUTER_DIRECTIVES],
    pipes: [SanitizeHtml],
    providers:[SyndicatedArticlePage],
})

export class RecommendationsComponent {
    @Input() randomHeadlines:any;
    @Input() images:any;
    @Input() isDeepDive:boolean = false;
    //constructor(private _page:SyndicatedArticlePage){
        //this._page.getRecomendationData();
  //  }


}
