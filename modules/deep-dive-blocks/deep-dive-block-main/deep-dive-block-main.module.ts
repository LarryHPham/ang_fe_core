import { Component, OnInit, Input } from '@angular/core';
import { DeepDiveService } from '../../../../services/deep-dive.service';
import { ArticleStackData, VideoStackData, SectionNameData } from "../../../interfaces/deep-dive.data";
import { GlobalSettings } from "../../../../global/global-settings";
import { GlobalFunctions } from "../../../../global/global-functions";
import { VerticalGlobalFunctions } from "../../../../global/vertical-global-functions";

declare var moment;

@Component({
  selector: 'deep-dive-block-main',
  templateUrl: './app/fe-core/modules/deep-dive-blocks/deep-dive-block-main/deep-dive-block-main.module.html',
})

export class DeepDiveBlockMain implements OnInit {
  @Input() geoLocation: string;
  breakingStack: Array<ArticleStackData>;
  recDataSports: Array<ArticleStackData>;
  businessStack: Array<ArticleStackData>;
  politicsStack: Array<ArticleStackData>;
  recDataEntertain: Array<ArticleStackData>;
  foodStack: Array<ArticleStackData>;
  recDataHealth: Array<ArticleStackData>;
  lifestyleStack: Array<ArticleStackData>;
  estateStack: Array<ArticleStackData>;
  recDataTravel: Array<ArticleStackData>;
  weatherStack: Array<ArticleStackData>;
  recDataAuto: Array<ArticleStackData>;

  videoDataBatch1: Array<VideoStackData>;
  videoDataBatch2: Array<VideoStackData>;
  videoDataBatch3: Array<VideoStackData>;

  secName: Array<SectionNameData>;
  articleCallLimit:number = 50;
  batchNum: number = 1;
  homePageBlocks = ["breaking", "video", "sports", "business", "politics", "entertainment", "food", "video", "health", "lifestyle", "realestate", "travel", "weather", "video", "automotive"];
 constructor(private _deepDiveData: DeepDiveService){
 }

 getSectionNameData(){
   var sectionNameArray = [];
   this.homePageBlocks.forEach(function(val, index){
     var d = {
       icon: val != 'video' ? GlobalSettings.getTCXscope(val).icon : 'fa-play-circle',
       title: val != 'video' ? GlobalFunctions.toTitleCase(GlobalSettings.getTCXscope(val).displayName) : 'Video',
       route: val != 'video' ? VerticalGlobalFunctions.formatSectionFrontRoute(GlobalSettings.getTCXscope(val).scope) : null
     }
     sectionNameArray.push(d);
   });
   return sectionNameArray;
 }

  getArticlesData(){
    this._deepDiveData.getDeepDiveBatchService("nfl", this.articleCallLimit, this.batchNum, this.geoLocation)
        .subscribe(data => {//TODO TESTING
          this.breakingStack  = this._deepDiveData.transformToArticleStack(data.data.slice(0,7), "breaking");
          this.recDataSports = this._deepDiveData.transformToArticleStack(data.data.slice(0,6), "sports");
          this.businessStack = this._deepDiveData.transformToArticleStack(data.data.slice(0,7), "business");
          this.politicsStack = this._deepDiveData.transformToArticleStack(data.data.slice(0,5), "politics");
          this.recDataEntertain = this._deepDiveData.transformToArticleStack(data.data.slice(0,6), "entertain");
          this.foodStack = this._deepDiveData.transformToArticleStack(data.data.slice(0,7), "food");
          this.recDataHealth = this._deepDiveData.transformToArticleStack(data.data.slice(0,6), "health");
          this.lifestyleStack = this._deepDiveData.transformToArticleStack(data.data.slice(0,7), "lifestyle");
          this.estateStack = this._deepDiveData.transformToArticleStack(data.data.slice(0,5), "realestate");
          this.recDataTravel = this._deepDiveData.transformToArticleStack(data.data.slice(0,6), "travel");
          this.weatherStack = this._deepDiveData.transformToArticleStack(data.data.slice(0,7), "weather");
          this.recDataAuto = this._deepDiveData.transformToArticleStack(data.data.slice(0,6), "automotive");
        },
        err => {
            console.log("Error getting Breaking News data");
        });
  }
  getDeepDiveVideo(){
      this._deepDiveData.getDeepDiveVideoBatchService("nfl", 15, 1).subscribe(
        data => {
          let videoBatch = data.data.splice(0, 5);
          this.videoDataBatch1 = this._deepDiveData.transformSportVideoBatchData(videoBatch, "nfl");
          this.videoDataBatch2 = this._deepDiveData.transformSportVideoBatchData(videoBatch, "nfl");
          this.videoDataBatch3 = this._deepDiveData.transformSportVideoBatchData(videoBatch, "nfl");
        },
        err => {
          console.log("Error getting video batch data");
      });
  }
  callModules(){
    this.getArticlesData();
    this.getDeepDiveVideo();
  }

  ngOnInit() {
    this.secName = this.getSectionNameData();
    this.callModules();
  }
}
