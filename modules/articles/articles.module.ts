import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {ArticleScheduleComponent} from "../../components/articles/article-schedule/article-schedule.component";
import {ArticleMainComponent} from "../../components/articles/main-article/main-article.component";
import {ArticleSubComponent} from "../../components/articles/sub-article/sub-article.component";
import {HeadToHeadComponent} from "../../components/articles/head-to-head-articles/head-to-head-articles.component";
import {ModuleHeader} from "../../components/module-header/module-header.component";
import {HeadlineData} from "../../../global/global-interface";
import {GlobalFunctions} from '../../../global/global-functions';
import {HeadlineDataService} from "../../../global/global-ai-headline-module-service";
import {Router, ROUTER_DIRECTIVES, RouteParams} from '@angular/router-deprecated';
import {ModuleHeaderData} from "../../components/module-header/module-header.component";
import {LoadingComponent} from "../../components/loading/loading.component";
import {VerticalGlobalFunctions} from "../../../global/vertical-global-functions";
import {GlobalSettings} from "../../../global/global-settings";
import {ImagesService} from "../../../services/carousel.service";

declare var moment:any;
declare var jQuery:any;

@Component({
    selector: 'articles-module',
    templateUrl: './app/fe-core/modules/articles/articles.module.html',
    directives: [
        ModuleHeader,
        ROUTER_DIRECTIVES,
        ArticleScheduleComponent,
        ArticleMainComponent,
        ArticleSubComponent,
        HeadToHeadComponent,
        LoadingComponent
    ],
    inputs: ['headlineError']
})

export class ArticlesModule implements OnInit {
    @Input() headlineData:Array<any>;
    @Input() isLeague:boolean;

    awayData:Array<any>;
    homeData:Array<any>;
    moduleData:Array<any>;
    randomArticles:Array<any>;
    scheduleAwayData:Array<any>;
    scheduleHomeData:Array<any>;
    subImages:Array<any>;
    eventType:string;
    keyword:string;
    mainContent:string;
    mainImage:string;
    mainTitle:string;
    teamID:string;
    timeStamp:string;
    eventID:number;
    mainEventID:number;
    isSmall:boolean = false;
    league:boolean = false;
    public headerInfo:ModuleHeaderData = {
        moduleTitle: "",
        hasIcon: false,
        iconClass: ""
    };

    constructor(private _params:RouteParams) {
        this.teamID = _params.get('teamId');
    }

    getArticles(data) {
        if (!this.isLeague) {
            this.eventID = data.event;
            this.scheduleHomeData = data.home;
            this.scheduleAwayData = data.away;
            this.moduleData = data;
            this.getHeaderData(data);
            if (!this.isLeague) {
                this.getSchedule(this.scheduleHomeData, this.scheduleAwayData);
            }
            this.getMainArticle(data);
            this.getSubArticles(data, this.eventID);
        } else {
            this.getHeaderData(data);
            this.getMainArticle(data);
            this.getSubArticles(data, this.eventID);
        }
    }

    getHeaderData(header) {
        if (!this.isLeague && ArticlesModule.checkData(header)) {
            moment.tz.add('America/New_York|EST EDT|50 40|0101|1Lz50 1zb0 Op0');
            this.timeStamp = moment(header.timestamp).format("MMMM DD YYYY");
            var dateString = moment(header.timestamp).format("MM/DD/YYYY");
            var isToday = moment(dateString).isSame(moment().tz('America/New_York'), 'day');
            var isPost = moment(dateString).isBefore(moment().tz('America/New_York'), 'day');
            if (isPost) {
                if (!this.isSmall) {
                    this.headerInfo.moduleTitle = "Post Gameday Matchup Against the " + (this.teamID == header.home.id ? ' ' + header.away.name : ' ' + header.home.name);
                } else {
                    this.headerInfo.moduleTitle = "Post Gameday Matchup";
                }
            } else {
                if (!this.isSmall) {
                    this.headerInfo.moduleTitle = (isToday ? "Today's" : moment(header.timestamp).format("dddd") + "'s") + " Gameday Matchup Against the " + (this.teamID == header.home.id ? ' ' + header.away.name : ' ' + header.home.name);
                } else {
                    this.headerInfo.moduleTitle = (isToday ? "Today's" : moment(header.timestamp).format("dddd") + "'s" + " Gameday") + " Matchup";
                }
            }
        } else {
            this.headerInfo.moduleTitle = "Headlines";
        }
    }

    getSchedule(homeData, awayData) {
        var homeArr = [];
        var awayArr = [];
        var val = [];
        var homeName = homeData.location + ' ' + homeData.name;
        var awayName = awayData.location + ' ' + awayData.name;
        val['homeID'] = homeData.id;
        val['homeName'] = homeData.name;
        val['homeLocation'] = homeData.location;
        val['homeHex'] = homeData.hex;
        if (this.teamID == homeData.id) {
            val['homeLogo'] = {
                imageClass: "image-66",
                mainImage: {
                    imageUrl: GlobalSettings.getImageUrl(homeData.logo),
                    imageClass: "border-logo"
                },
                subImages: []
            };
        } else {
            let homeLink = VerticalGlobalFunctions.formatTeamRoute(homeName, homeData.id);
            val['url'] = homeLink;
            val['homeLogo'] = {
                imageClass: "image-66",
                mainImage: {
                    imageUrl: GlobalSettings.getImageUrl(homeData.logo),
                    urlRouteArray: homeLink,
                    hoverText: "<i class='fa fa-mail-forward'></i>",
                    imageClass: "border-logo"
                },
                subImages: []
            };
        }
        val['homeWins'] = homeData.wins;
        val['homeLosses'] = homeData.losses;
        homeArr.push(val);
        val = [];
        val['awayID'] = awayData.id;
        val['awayName'] = awayData.name;
        val['awayLocation'] = awayData.location;
        val['awayHex'] = awayData.hex;
        if (this.teamID == awayData.id) {
            val['awayLogo'] = {
                imageClass: "image-66",
                mainImage: {
                    imageUrl: GlobalSettings.getImageUrl(awayData.logo),
                    imageClass: "border-logo"
                },
                subImages: []
            };
        } else {
            let awayLink = VerticalGlobalFunctions.formatTeamRoute(awayName, awayData.id);
            val['url'] = awayLink;
            val['awayLogo'] = {
                imageClass: "image-66",
                mainImage: {
                    imageUrl: GlobalSettings.getImageUrl(awayData.logo),
                    urlRouteArray: awayLink,
                    hoverText: "<i class='fa fa-mail-forward'></i>",
                    imageClass: "border-logo"
                },
                subImages: []
            };
        }
        val['awayWins'] = awayData.wins;
        val['awayLosses'] = awayData.losses;
        awayArr.push(val);
        this.homeData = homeArr;
        this.awayData = awayArr;
    }

    getMainArticle(headlineData) {
        if (!this.isLeague) {
            var pageIndex = Object.keys(headlineData['featuredReport'])[0];
            switch (pageIndex) {
                case'pregame-report':
                    this.keyword = 'PREGAME';
                    break;
                case'postgame-report':
                    this.keyword = 'POSTGAME';
                    break;
                default:
                    this.keyword = 'LIVE';
                    break;
            }
            this.mainTitle = headlineData['featuredReport'][pageIndex].displayHeadline;
            this.eventType = pageIndex;
            this.mainEventID = headlineData.event;
            var articleContent = headlineData['featuredReport'][pageIndex].metaHeadline;
            var maxLength = 1000;
            var trimmedArticle = articleContent.substring(0, maxLength);
            this.mainContent = trimmedArticle.substr(0, Math.min(trimmedArticle.length, trimmedArticle.lastIndexOf(" ")));
            this.mainImage = GlobalSettings.getImageUrl(headlineData['featuredReport'][pageIndex].image);
        } else {
            this.keyword = "PREGAME";
            this.mainTitle = headlineData['data'][0].title;
            this.eventType = "pregame-report";
            this.mainEventID = headlineData['data'][0].event_id;
            var articleContent = headlineData['data'][0].teaser;
            this.mainImage = GlobalSettings.getImageUrl(headlineData['data'][0].image_url);
            var maxLength = 1000;
            var trimmedArticle = articleContent.substring(0, maxLength);
            this.mainContent = trimmedArticle.substr(0, Math.min(trimmedArticle.length, trimmedArticle.lastIndexOf(" ")));
        }
    }

    getSubArticles(data, eventID) {
        var articles;
        var articleArr = [];
        if (!this.isLeague) {
            Object.keys(data['otherReports']).forEach(function (val) {
                articles = {
                    title: data['otherReports'][val].displayHeadline,
                    eventType: val,
                    eventID: eventID,
                    images: GlobalSettings.getImageUrl(data['otherReports'][val].image)
                };
                articleArr.push(articles);
            });
        } else {
            data['data'].forEach(function (val, index) {
                if (index > 0) {
                    articles = {
                        title: val.title,
                        eventType: "pregame-report",
                        eventID: val.event_id,
                        images: GlobalSettings.getImageUrl(val.image_url)
                    };
                    articleArr.push(articles);
                }
            });
        }
        articleArr.sort(function () {
            return 0.5 - Math.random()
        });
        this.randomArticles = articleArr;
    }

    fitText() {
        try {
            var text = !this.isSmall ? jQuery('.main-article-container-content') : jQuery('.main-article-container-content-small');
            if (text[0].scrollHeight > text[0].clientHeight) {
                var original = text[0].innerHTML.substring(0, 400),
                    index = 0;
                while (index < 500 && text[0].scrollHeight > text[0].clientHeight) {
                    index++;
                    original = original.substring(0, original.lastIndexOf(" "));
                    if (!this.isSmall) {
                        text[0].innerHTML = original + '...<span class="main-article-container-content-read-more">Read More</span>';
                    } else {
                        text[0].innerHTML = original + '...';
                    }
                }
            }
        } catch (e) {
        }
    }

    static checkData(data) {
        return data
    }

    onResize(event) {
        this.isSmall = event.target.innerWidth <= 639;
        this.fitText();
        this.getHeaderData(this.moduleData);
    }

    ngOnInit() {
        this.isSmall = window.innerWidth <= 639;
    }

    ngOnChanges() {
        if (ArticlesModule.checkData(this.headlineData)) {
            this.getArticles(this.headlineData);
            this.fitText();
        }
    }
}
