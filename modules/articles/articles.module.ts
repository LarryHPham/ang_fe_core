import {Component, Input, OnInit} from '@angular/core';
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
    inputs: ['headlineError'],
    providers: [],
})

export class ArticlesModule implements OnInit {
    @Input() isLeague:boolean;
    @Input() headlineData:Array<any>;

    moduleData:Array<any>;
    imageData:any;
    scheduleHomeData:any;
    scheduleAwayData:any;
    randomArticles:any;
    mainImage:string;
    subImages:Array<any>;
    mainTitle:string;
    titleFontSize:string;
    mainContent:string;
    images:any;
    homeData:any;
    awayData:any;
    teamID:string;
    eventID:number;
    eventType:string;
    mainEventID:number;
    arrLength:number;
    league:boolean = false;
    timeStamp:string;
    keyword:string;
    isSmall:boolean = false;
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
            //this.imageData = HeadlineData['home'].images.concat(HeadlineData['away'].images);
            this.imageData = "NADA";
            this.eventID = data['data'].event;
            this.scheduleHomeData = data['data'].home;
            this.scheduleAwayData = data['data'].away;
            this.moduleData = data;
            this.getHeaderData(data['data']);
            if (!this.isLeague) {
                this.getSchedule(this.scheduleHomeData, this.scheduleAwayData);
            }
            this.getMainArticle(data['data'], this.imageData, this.eventID);
            this.getSubArticles(data['data'], this.imageData, this.eventID);
        } else {
            this.imageData = "NADA";
            this.getHeaderData(data);
            this.getMainArticle(data, this.imageData, this.eventID);
            this.getSubArticles(data, this.imageData, this.eventID);
        }

    }

    getHeaderData(header) {
        if (!this.isLeague && ArticlesModule.checkData(header)) {
            moment.tz.add('America/New_York|EST EDT|50 40|0101|1Lz50 1zb0 Op0');
            this.timeStamp = moment.tz(moment.unix(header.timestamp), 'America/New_York').format("MMMM DD YYYY");
            var dateString = moment.tz(moment.unix(header.timestamp), 'America/New_York').format("MM/DD/YYYY");
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
                    this.headerInfo.moduleTitle = (isToday ? "Today's" : moment.unix(header.timestamp).format("dddd") + "'s") + " Gameday Matchup Against the " + (this.teamID == header.home.id ? ' ' + header.away.name : ' ' + header.home.name);
                } else {
                    this.headerInfo.moduleTitle = (isToday ? "Today's" : moment.unix(header.timestamp).format("dddd") + "'s" + " Gameday") + " Matchup";
                }
            }
        } else {
            this.headerInfo.moduleTitle = "Headlines";
        }
    }

    static convertToETMoment(easternDateString) {
        return moment(moment(easternDateString).format("MM/DD/YYYY"), "America/New_York");
    };

    getSchedule(homeData, awayData) {
        var homeArr = [];
        var awayArr = [];
        var val = [];
        var homeName = homeData.name;
        var awayName = awayData.name;
        val['homeID'] = homeData.id;
        val['homeLocation'] = homeData.name;
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
        val['awayLocation'] = awayData.name;
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

    getImages(imageList, articleType) {
        imageList.sort(function () {
            return 0.5 - Math.random()
        });
        if (articleType == 'main') {
            this.mainImage = imageList[0];
        }
        if (articleType == 'sub') {
            return this.subImages = imageList;
        }
    }

    getMainArticle(headlineData, imageData, eventID) {
        if (!this.isLeague) {
            var pageIndex = Object.keys(headlineData['featuredReport'])[0];
            switch (pageIndex) {
                case'pregame-report':
                    this.keyword = 'PREGAME';
                    break;
                case'postgame-report':
                    this.keyword = 'POSTGAME';
                    break;
                //do not have live game data yet. The default is for testing.
                default:
                    this.keyword = 'LIVE';
                    break;
            }
            this.mainTitle = headlineData['featuredReport'][pageIndex].displayHeadline;
            this.eventType = pageIndex;
            this.mainEventID = headlineData.event;
            var articleContent = headlineData['featuredReport'][pageIndex].metaHeadline;
            var maxLength = 500;
            var trimmedArticle = articleContent.substring(0, maxLength);
            this.mainContent = trimmedArticle.substr(0, Math.min(trimmedArticle.length, trimmedArticle.lastIndexOf(" ")));
            var articleType = 'main';
            //this.getImages(imageData, articleType);
        } else {
            this.keyword = "PREGAME";
            this.mainTitle = headlineData['data'][0].title;
            this.eventType = "pregame-report";
            this.mainEventID = headlineData['data'][0].event_id;
            var articleContent = headlineData['data'][0].teaser;
            var maxLength = 235;
            var trimmedArticle = articleContent.substring(0, maxLength);
            this.mainContent = trimmedArticle.substr(0, Math.min(trimmedArticle.length, trimmedArticle.lastIndexOf(" ")));
            var articleType = 'main';
            //this.getImages(imageData, articleType);
        }
    }

    getSubArticles(data, imageData, eventID) {
        //This code will change drastically once the proper api call has been created. This is temporary.
        var articleType = 'sub';
        var articles;
        //this.getImages(imageData, articleType);
        var articleArr = [];
        var imageCount = 0;
        var self = this;
        if (!this.isLeague) {
            Object.keys(data['otherReports']).forEach(function (val) {
                imageCount++;
                articles = {
                    title: data['otherReports'][val].displayHeadline,
                    eventType: val,
                    eventID: eventID,
                    //images: self.subImages[imageCount]
                };
                articleArr.push(articles);
            });
        } else {
            data['data'].forEach(function (val, index) {
                if (index > 0) {
                    imageCount++;
                    articles = {
                        title: val.title,
                        eventType: "pregame-report",
                        eventID: val.event_id,
                        //images: self.subImages[imageCount]
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

    static checkData(data) {
        return data
    }

    onResize(event) {
        this.isSmall = event.target.innerWidth <= 639;
        this.getHeaderData(this.moduleData);
    }

    ngOnInit() {
        this.isSmall = window.innerWidth <= 639;
    }

    ngOnChanges() {
        if (ArticlesModule.checkData(this.headlineData)) {
            this.getArticles(this.headlineData);
        }
    }
}
