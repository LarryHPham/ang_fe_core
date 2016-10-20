import { Component, OnInit, Input } from '@angular/core';
import { DeepDiveService } from '../../../../services/deep-dive.service';
import { VideoStackData, ArticleStackData, SectionNameData } from "../../../interfaces/deep-dive.data";
import { BoxScoresService } from '../../../../services/box-scores.service';

declare var moment;

@Component({
  selector: 'deep-dive-block-1',
  templateUrl: './app/fe-core/modules/deep-dive-blocks/deep-dive-block-1/deep-dive-block-1.module.html',
})

export class DeepDiveBlock1 implements OnInit {
  @Input() scope: string;
  @Input() geoLocation: string;
  @Input() category:string;
  videoDataTop: Array<VideoStackData>;
  videoDataBatch: Array<VideoStackData>;
  firstStackTop: Array<ArticleStackData>;
  firstStackRow: Array<ArticleStackData>;
  recData: Array<ArticleStackData>;//TODO
  articleStack2DataTop: Array<ArticleStackData>;//TODO
  articleStack2DataBatch: Array<ArticleStackData>;//TODO
  articleCallLimit:number = 23;
  videoCallLimit:number = 5;
  batchNum: number = 1;
  //Box Scores
  boxScoresData: any;
  currentBoxScores: any;
  dateParam: any;
  boxScoresTempVar: string = "nfl";
  boxScoresScroll: boolean= true;
  constructor(private _boxScoresService: BoxScoresService, private _deepDiveData: DeepDiveService){
    //Box Scores
    var currentUnixDate = new Date().getTime();
    //convert currentDate(users local time) to Unix and push it into boxScoresAPI as YYYY-MM-DD in EST using moment timezone (America/New_York)
    this.dateParam ={
      scope: this.boxScoresTempVar,//current profile page
      teamId: '',
      //date: '2016-09-22'
      date: moment.tz( currentUnixDate , 'America/New_York' ).format('YYYY-MM-DD')
    }
  }
  getFirstArticleStackData(){
    this._deepDiveData.getDeepDiveBatchService("nfl", this.articleCallLimit, this.batchNum, this.geoLocation)
        .subscribe(data => {
          let stackTop = [data[0]];
          this.firstStackTop = this._deepDiveData.transformToArticleStack(stackTop, this.scope);
          let stackRow = data.splice(1,8);
          this.firstStackRow  = this._deepDiveData.transformToArticleStack(stackRow, this.scope);
          let recInfo = data.splice(1, 6);//TODO
          this.recData = this._deepDiveData.transformToArticleStack(recInfo, this.scope);//TODO
          let articleStack2Top = [data[0]];//TODO
          this.articleStack2DataTop = this._deepDiveData.transformToArticleStack(articleStack2Top, this.scope);//TODO
          let articleStack2 = data.splice(1,4);//TODO
          this.articleStack2DataBatch = this._deepDiveData.transformToArticleStack(articleStack2, this.scope);//TODO
        },
        err => {
            console.log("Error getting first article stack data");
        });
  }

  getDeepDiveVideo(){
      this._deepDiveData.getDeepDiveVideoBatchService(this.scope, this.videoCallLimit, this.batchNum, this.geoLocation).subscribe(
        data => {
          if(this.scope == "nba"){
            data = data.data.data;
          } else {
            data = data.data;
          }
          this.videoDataBatch = this._deepDiveData.transformSportVideoBatchData(data, this.scope);//TODO
        },
        err => {
          console.log("Error getting video batch data");
      });
  }

  //API for Box Scores
  private getBoxScores(dateParams?) {
    // console.log('1. deep-dive-page, getBoxScores - dateParams - ',dateParams);
    if ( dateParams != null ) {
      this.dateParam = dateParams;
    }
    this._boxScoresService.getBoxScores(this.boxScoresData, this.boxScoresTempVar, this.dateParam, (boxScoresData, currentBoxScores) => {
        this.boxScoresData = boxScoresData;
        this.currentBoxScores = currentBoxScores;
    });
  }

  callModules(){
    this.getDeepDiveVideo();
    this.getFirstArticleStackData();
    this.getBoxScores(this.dateParam);
  }

  ngOnChanges() {
    this.callModules();
  }

  ngOnInit() {
    this.callModules();
  }
}
