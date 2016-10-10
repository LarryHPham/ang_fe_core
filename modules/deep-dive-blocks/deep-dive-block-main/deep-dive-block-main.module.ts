import { Component, OnInit, Input } from '@angular/core';
import { DeepDiveService } from '../../../../services/deep-dive.service';
import { ArticleStackData, VideoStackData, SectionNameData } from "../../../interfaces/deep-dive.data";

declare var moment;

@Component({
  selector: 'deep-dive-block-main',
  templateUrl: './app/fe-core/modules/deep-dive-blocks/deep-dive-block-main/deep-dive-block-main.module.html',
})

export class DeepDiveBlockMain implements OnInit {
  stackTop1: Array<ArticleStackData>;
  stackRow1: Array<ArticleStackData>;
  stackTop2: Array<ArticleStackData>;
  stackRow2: Array<ArticleStackData>;
  stackTop3: Array<ArticleStackData>;
  stackRow3: Array<ArticleStackData>;
  recData1: Array<ArticleStackData>;
  recData2: Array<ArticleStackData>;

  videoDataTopMain: Array<VideoStackData>;
  videoDataBatchMain: Array<VideoStackData>;

  sectionName1: SectionNameData =  {
     icon: "fa-clock",
     title: "Breaking News",
     route: ['deep-dive']//TODO TEST
   }
  sectionName2: SectionNameData =  {
     icon: "fa-play-circle",
     title: "Video"
   }
  sectionName3: SectionNameData =  {
     icon: "fa-futbol-o",
     title: "Sports"
   }
  sectionName4: SectionNameData =  {
     icon: "fa-fontawesome-webfont-3",
     title: "Business"
   }
  sectionName5: SectionNameData =  {
     icon: "fa-university",
     title: "Politics"
   }
  sectionName6: SectionNameData =  {
     icon: "fa-film",
     title: "Entertainment"
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
          this.stackTop1 = this._deepDiveData.transformToArticleStack(article1, "Breaking News");
          this.stackRow1  = this._deepDiveData.transformToArticleStack(article8, "Breaking News");
          this.recData1 = this._deepDiveData.transformToArticleStack(article6, "Sports");
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
          this.videoDataTopMain = this._deepDiveData.transformDeepDiveVideoBatchData(videoOne);
          this.videoDataBatchMain = this._deepDiveData.transformDeepDiveVideoBatchData(videoBatch);
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
