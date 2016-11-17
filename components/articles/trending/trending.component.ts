import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HeadlineDataService} from "../../../../services/headline-module-service";
import {GlobalFunctions} from "../../../../global/global-functions";
import {GlobalSettings} from "../../../../global/global-settings";
import {VerticalGlobalFunctions} from "../../../../global/vertical-global-functions";
import {DeepDiveService} from "../../../../services/deep-dive.service";

declare var moment;
declare var jQuery:any;

@Component({
    selector: 'trending-component',
    templateUrl: './app/fe-core/components/articles/trending/trending.component.html',
    providers: [DeepDiveService]
})

export class TrendingComponent implements OnInit {
    @Input() currentArticleId:string;
    @Input() eventType:string;
    @Input() geoLocation:string;
    @Input() scope:string;
    public params;
    hasRun:boolean = false;
    throttle:any;
    isScroll:number = 0;
    batch:number = 1;
    public imageData:any;
    public trendingData:any;
    public trendingLength:number = 10;
    partnerID:string;

    constructor(private _router:Router,
                private _headlineDataService:HeadlineDataService,
                private _deepDiveService:DeepDiveService) {
        GlobalSettings.getParentParams(_router, parentParams => {
            this.partnerID = parentParams.partnerID;
        });
    }

    private getTrendingArticles(count, currentArticleId) {
        if (this.eventType != "story" && this.eventType != "video") {
            this._headlineDataService.getAiTrendingData(count, this.scope).subscribe(
                data => {
                    if (!this.hasRun) {
                        this.hasRun = true;
                        this.trendingData = this.transformTrending(data['data'], currentArticleId);
                        if (this.trendingLength <= 100) {
                            this.trendingLength = this.trendingLength + 10;
                        }
                    }
                }
            )
        } else {
            this._deepDiveService.getDeepDiveBatchService(this.scope, count, 1, this.geoLocation).subscribe(
                data => {
                    if (!this.hasRun) {
                        this.hasRun = true;
                        this.trendingData = this.transformTrending(data['data'], currentArticleId);
                        if (this.trendingLength <= 100) {
                            this.trendingLength = this.trendingLength + 10;
                        }
                    }
                }
            )
        }
    }

    ngOnInit() {
        this.getTrendingArticles(10, this.currentArticleId);
    }

    private onScroll(event) {
        this.hasRun = false;
        if (jQuery(document).height() - window.innerHeight - jQuery("footer").height() <= jQuery(window).scrollTop() && this.trendingLength <= 100) {
            this.batch = this.batch + 1;
            this.getTrendingArticles(this.trendingLength, this.currentArticleId);
        }
    }

    transformTrending(data, currentArticleId) {
        var articles = [];
        var self = this;
        data.forEach(function (val, index) {
            var articleData;
            if (self.eventType != "story" && self.eventType != "video") {
                if (val.event_id != currentArticleId) {
                    var date = GlobalFunctions.sntGlobalDateFormatting(moment.unix(val.last_updated), 'timeZone');
                    val["date"] = date;
                    articleData = {
                        title: val.title,
                        date: val["date"],
                        content: val.teaser,
                        eventId: val.event_id,
                        eventType: "pregame-report",
                        image: GlobalSettings.getImageUrl(val.image_url),
                        url: VerticalGlobalFunctions.formatArticleRoute("pregame-report", val.event_id),
                        rawUrl: window.location.protocol + "//" + window.location.host + "/" + self.scope + "/articles/pregame-report/" + val.event_id
                    };
                }
            } else {
                if (val.id != currentArticleId) {
                    var date = GlobalFunctions.sntGlobalDateFormatting(val.publishedDate, 'timeZone');
                    val["date"] = date;
                    articleData = {
                        title: val.title,
                        date: val["date"],
                        content: val.teaser,
                        eventId: val.id,
                        eventType: "story",
                        image: GlobalSettings.getImageUrl(val.imagePath),
                        url: VerticalGlobalFunctions.formatArticleRoute("story", val.id),
                        rawUrl: window.location.protocol + "//" + window.location.host + "/" + self.scope + "/articles/story/" + val.id
                    };
                }
            }
            if (articleData != null) {
                articles.push(articleData);
            }
        });
        return articles;
    }
}
