import {Component, Input, OnInit, OnChanges, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {isBrowser} from 'angular2-universal';

//globals
import {GlobalSettings} from "../../../global/global-settings";
import {GlobalFunctions} from '../../../global/global-functions';
import {VerticalGlobalFunctions} from "../../../global/vertical-global-functions";

//libraries
declare var moment:any;

@Component({
  selector: 'articles-module',
  templateUrl: './articles.module.html'
})

export class ArticlesModule implements OnInit {
  @Input() headlineData:Array<any>;
  @Input() isLeague:boolean;
  @Input() headlineError:boolean;
  moduleData:Array<any>;
  defaultGradient:string;
  fullGradient:string;
  scope:string;
  teamID:string;
  timeStamp:string;
  isSmall:boolean = false;
  league:boolean = false;
  public _collegeDivisonFullAbbrv:string = GlobalSettings.getCollegeDivisionFullAbbrv();
  public headerInfo = {
    moduleTitle: "",
    hasIcon: false,
    iconClass: ""
  };
  public params;

  constructor(private _activateRoute:ActivatedRoute, private _elementRef:ElementRef) {
    this.params = this._activateRoute.params.subscribe(
      (param:any)=> {
        this.scope = param['scope'];
        this.teamID = param['teamID'] ? param['teamID'] : null;
      }
    );
  }

  getArticles(data) {
    this.headlineError = false;
    try {
      if (data != null) {
        this.moduleData = data;
        if (!this.isLeague) {
          this.defaultGradient = data['scheduleData']['gradient'].defaultGradient;
          this.fullGradient = data['scheduleData']['gradient'].fullGradient;
        }
        this.getHeaderData(data);
      } else {
        this.headlineError = true;
        console.log('headline error');
      }
    } catch (e) {
      this.headlineError = true;
      console.log('headline error ', e);
    }
  }

  getHeaderData(header) {
    if (!this.isLeague && ArticlesModule.checkData(header)) {
      this.timeStamp = GlobalFunctions.sntGlobalDateFormatting(header.timestamp, "defaultDate");
      var dateString = GlobalFunctions.sntGlobalDateFormatting(header.timestamp, "shortDate");
      var isToday = moment(dateString).isSame(moment().tz('America/New_York'), 'day');
      var isPost = moment(dateString).isBefore(moment().tz('America/New_York'), 'day');
      if (isPost) {
        this.headerInfo.moduleTitle = !this.isSmall ? "Post Gameday Matchup Against the " + (this.teamID == header.home.id ? ' ' + header.away.name : ' ' + header.home.name) : "Post Gameday Matchup";
      } else {
        this.headerInfo.moduleTitle = !this.isSmall ? (isToday ? "Today's" : moment(header.timestamp).format("dddd") + "'s") + " Gameday Matchup Against the " + (this.teamID == header.home.id ? ' ' + header.away.name : ' ' + header.home.name) :
        (isToday ? "Today's" : moment(header.timestamp).format("dddd") + "'s" + " Gameday") + " Matchup";
      }
    } else {
      this.headerInfo.moduleTitle = "Headlines<span class='mod-info'> - " + (this.scope.toLowerCase() != 'nfl' ? this._collegeDivisonFullAbbrv : 'NFL') + "</span>";
    }
  } //getHeaderData(header)

  fitText() {
    try {
      var text = !this.isSmall ? this._elementRef.nativeElement.getElementsByClassName('main-article-container-content-text')[0] : this._elementRef.nativeElement.getElementsByClassName('main-article-container-content-text-small')[0];
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
    if (this.moduleData != null) {
      this.getHeaderData(this.moduleData);
    }
  }

  ngOnInit() {
    if (isBrowser) {
      this.isSmall = window.innerWidth <= 639;
    }
  }

  ngOnChanges() {
    if (ArticlesModule.checkData(this.headlineData)) {
      this.getArticles(this.headlineData);
      this.fitText();
    }
  }
}
