import {Component, OnInit, Input} from '@angular/core';
import {Router,ROUTER_DIRECTIVES, RouteParams} from '@angular/router-deprecated';
import {SanitizeHtml} from "../../../pipes/safe.pipe";
import {SidekickContainerComponent} from "../sidekick-container/sidekick-container.component";
import {ShareLinksComponent} from "../shareLinks/shareLinks.component";
import {HeadlineDataService} from "../../../../global/global-ai-headline-module-service";
import {GlobalFunctions} from "../../../../global/global-functions";
import {GlobalSettings} from "../../../../global/global-settings";
import {VerticalGlobalFunctions} from "../../../../global/vertical-global-functions";
import {throttle} from "rxjs/operator/throttle";
import {debounce} from "rxjs/operator/debounce";

declare var moment;
declare var jQuery:any;

@Component({
    selector: 'trending-component',
    templateUrl: './app/fe-core/components/articles/trending/trending.component.html',
    directives: [ShareLinksComponent, ROUTER_DIRECTIVES, SidekickContainerComponent],
    inputs: ['currentArticleId'],
    pipes: [SanitizeHtml],
})

export class TrendingComponent implements OnInit {
    isSmall:boolean = false;
    throttle:any;
    isScroll:number = 0;
    public imageData:any;
    public trendingData:any;
    public trendingLength:number = 10;
    @Input() currentArticleId:any;

    constructor(private _router:Router,
                private _headlineDataService:HeadlineDataService) {
    }

    private getTrendingArticles(count, currentArticleId) {
        this._headlineDataService.getAiHeadlineDataLeague(count).subscribe(
            data => {
                this.trendingData = this.transformTrending(data['data'], currentArticleId);
                if (this.trendingLength <= 100) {
                    this.trendingLength = this.trendingLength + 10;
                }
            }
        )
    }

    ngOnInit() {
        this.isSmall = window.innerWidth <= 639;
        this.getTrendingArticles(10, this.currentArticleId);
    }

    private onScroll(event) {
        if (jQuery(document).height() - window.innerHeight - jQuery("footer").height() <= jQuery(window).scrollTop() && this.trendingLength <= 100) {
            this.getTrendingArticles(this.trendingLength, this.currentArticleId);
        }
    }

    onResize(event) {
        this.isSmall = event.target.innerWidth <= 639;
    }

    transformTrending(data, currentArticleId) {
        var articles = [];
        data.forEach(function (val, index) {
            if (val.id != currentArticleId) {
                let date = GlobalFunctions.formatDate(val.last_updated);
                val["date"] = date.month + " " + date.day + ", " + date.year + " " + date.time + " " + date.a + " EST";
                articles[index] = {
                    title: val.title,
                    date: val["date"],
                    content: val.teaser,
                    eventId: val.event_id,
                    eventType: "pregame-report",
                    url: VerticalGlobalFunctions.formatArticleRoute("pregame-report", val.event_id),
                    rawUrl: window.location.protocol + "//" + window.location.host + "nfl/articles/pregame-report/" + val.event_id
                };
            }
        });
        return articles;
    }
}