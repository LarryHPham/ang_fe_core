import { Component, OnInit, Input } from '@angular/core';
import { DeepDiveService } from '../../../../services/deep-dive.service';
import { ArticleStackData, VideoStackData, SectionNameData } from "../../../interfaces/deep-dive.data";

declare var moment;

@Component({
  selector: 'deep-dive-block-main',
  templateUrl: './app/fe-core/modules/deep-dive-blocks/deep-dive-block-main/deep-dive-block-main.module.html',
})

export class DeepDiveBlockMain implements OnInit {
  newsStackTop: Array<ArticleStackData>;
  newsStackRow: Array<ArticleStackData>;
  recDataSports: Array<ArticleStackData>;
  businessStackTop: Array<ArticleStackData>;
  businessStackRow: Array<ArticleStackData>;
  politicsStackTop: Array<ArticleStackData>;
  politicsStackBatch: Array<ArticleStackData>;
  recDataEntertain: Array<ArticleStackData>;
  foodStackTop: Array<ArticleStackData>;
  foodStackRow: Array<ArticleStackData>;
  recDataHealth: Array<ArticleStackData>;
  lifestyleStackTop: Array<ArticleStackData>;
  lifestyleStackRow: Array<ArticleStackData>;
  estateStackTop: Array<ArticleStackData>;
  estateStackBatch: Array<ArticleStackData>;
  recDataTravel: Array<ArticleStackData>;
  weatherStackTop: Array<ArticleStackData>;
  weatherStackRow: Array<ArticleStackData>;
  recDataAuto: Array<ArticleStackData>;
  videoDataTop1: Array<VideoStackData>;
  videoDataBatch1: Array<VideoStackData>;
  videoDataTop2: Array<VideoStackData>;
  videoDataBatch2: Array<VideoStackData>;
  videoDataTop3: Array<VideoStackData>;
  videoDataBatch3: Array<VideoStackData>;

  sectionNameNews: SectionNameData =  {
     icon: "fa-clock",
     title: "Breaking News"
   }
  sectionNameVideo: SectionNameData =  {
     icon: "fa-play-circle",
     title: "Video"
   }
  sectionNameSports: SectionNameData =  {
     icon: "fa-futbol-o",
     title: "Sports"
   }
  sectionNameBusiness: SectionNameData =  {
     icon: "fa-fontawesome-webfont-3",
     title: "Business"
   }
  sectionNamePolitics: SectionNameData =  {
     icon: "fa-university",
     title: "Politics"
   }
  sectionNameEntertain: SectionNameData =  {
     icon: "fa-film",
     title: "Entertainment"
   }
  sectionNameFood: SectionNameData =  {
     icon: "fa-cutlery",
     title: "Food"
   }
  sectionNameHealth: SectionNameData =  {
     icon: "fa-heartbeat",
     title: "Health"
   }
  sectionNameLifestyle: SectionNameData =  {
     icon: "fa-diamond",
     title: "Lifestyle"
   }
  sectionNameEstate: SectionNameData =  {
     icon: "fa-home-1",
     title: "Real Estate"
   }
  sectionNameTravel: SectionNameData =  {
     icon: "fa-plane",
     title: "Travel"
   }
  sectionNameWeather: SectionNameData =  {
     icon: "fa-cloud-1",
     title: "Weather"
   }
  sectionNameAuto: SectionNameData =  {
     icon: "fa-auto-shape",
     title: "Automotive"
   }

  geoLocation: string = "ks";//TODO
  articleCallLimit:number = 50;
  batchNum: number = 1;
 constructor(private _deepDiveData: DeepDiveService){}
  getArticlesData(){
    this._deepDiveData.getDeepDiveBatchService("nfl", this.articleCallLimit, this.batchNum, this.geoLocation)
        .subscribe(data => {//TODO TESTING
          let article1 = data.data.splice(1,1);
          let article4 = data.data.splice(1,4);
          let article6 = data.data.splice(1,6);
          let article8 = data.data.splice(1,8);
          this.newsStackTop = this._deepDiveData.transformToArticleStack(article1, "Breaking News");
          this.newsStackRow  = this._deepDiveData.transformToArticleStack(article8, "Breaking News");
          this.recDataSports = this._deepDiveData.transformToArticleStack(article6, "Sports");
        },
        err => {
            console.log("Error getting Breaking News data");
        });
  }
  getDeepDiveVideo(){
      this._deepDiveData.getDeepDiveVideoBatchService("nfl", 18, 1).subscribe(
        data => {
          let videoOne = [data.data[0]];
          let videoBatch = data.data.splice(1,5);
          this.videoDataTop1 = this._deepDiveData.transformDeepDiveVideoBatchData(videoOne);
          this.videoDataBatch1 = this._deepDiveData.transformDeepDiveVideoBatchData(videoBatch);
          this.videoDataTop2 = this._deepDiveData.transformDeepDiveVideoBatchData(videoOne);
          this.videoDataBatch2 = this._deepDiveData.transformDeepDiveVideoBatchData(videoBatch);
          this.videoDataTop3 = this._deepDiveData.transformDeepDiveVideoBatchData(videoOne);
          this.videoDataBatch3 = this._deepDiveData.transformDeepDiveVideoBatchData(videoBatch);
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
    this.callModules();
  }
}
