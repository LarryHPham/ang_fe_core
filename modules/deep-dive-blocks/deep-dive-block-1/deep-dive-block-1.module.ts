import { Component, OnInit, Input } from '@angular/core';
import { DeepDiveService } from '../../../../services/deep-dive.service';
import { VideoStackData, ArticleStackData, SectionNameData } from "../../../interfaces/deep-dive.data";

declare var moment;

@Component({
  selector: 'deep-dive-block-1',
  templateUrl: './app/fe-core/modules/deep-dive-blocks/deep-dive-block-1/deep-dive-block-1.module.html',
})

export class DeepDiveBlock1 implements OnInit {
  @Input() scope: string;
  videoDataTop: Array<VideoStackData>;
  videoDataBatch: Array<VideoStackData>;
  firstStackTop: Array<ArticleStackData>;
  firstStackRow: Array<ArticleStackData>;
  sectionName: SectionNameData = {
    icon: "fa-calendar-1-times-o",
    title: "Section Name One"
  };
  recData: Array<ArticleStackData>;//TODO
  articleStack2DataTop: Array<ArticleStackData>;//TODO
  articleStack2DataBatch: Array<ArticleStackData>;//TODO
  geoLocation: string = "ks";//TODO
  articleCallLimit:number = 23;
  videoCallLimit:number = 9;
  batchNum: number = 1;
  constructor(private _deepDiveData: DeepDiveService){}
  getFirstArticleStackData(){
    this._deepDiveData.getDeepDiveBatchService(this.scope, this.articleCallLimit, this.batchNum, this.geoLocation)
        .subscribe(data => {
          let stackTop = [data.data[0]];
          this.firstStackTop = this._deepDiveData.transformToArticleStack(stackTop);
          let stackRow = data.data.splice(1,8);
          this.firstStackRow  = this._deepDiveData.transformToArticleStack(stackRow);
          let recInfo = data.data.splice(1, 6);//TODO
          this.recData = this._deepDiveData.transformToArticleStack(recInfo);//TODO
          let articleStack2Top = [data.data[0]];//TODO
          this.articleStack2DataTop = this._deepDiveData.transformToArticleStack(articleStack2Top);//TODO
          let articleStack2 = data.data.splice(1,4);//TODO
          this.articleStack2DataBatch = this._deepDiveData.transformToArticleStack(articleStack2);//TODO
        },
        err => {
            console.log("Error getting first article stack data");
        });
  }

  getDeepDiveVideo(){
      this._deepDiveData.getDeepDiveVideoBatchService(this.scope, this.videoCallLimit, this.batchNum).subscribe(
        data => {
          let videoOne = [data.data[0]];
          let videoBatch = data.data.splice(1,5);
          this.videoDataTop = this._deepDiveData.transformDeepDiveVideoBatchData(videoOne);
          this.videoDataBatch = this._deepDiveData.transformDeepDiveVideoBatchData(videoBatch);
        },
        err => {
          console.log("Error getting video batch data");
      });
  }

  callModules(){
    this.getDeepDiveVideo();
    this.getFirstArticleStackData();
  }

  ngOnInit() {
    this.callModules();
  }
}
