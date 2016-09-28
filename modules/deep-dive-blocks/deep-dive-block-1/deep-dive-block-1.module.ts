import { Component, OnInit, Input } from '@angular/core';
import { DeepDiveService } from '../../../../services/deep-dive.service';
import { VideoStackData, ArticleStackData } from "../../../interfaces/deep-dive.data";

declare var moment;

@Component({
  selector: 'deep-dive-block-1',
  templateUrl: './app/fe-core/modules/deep-dive-blocks/deep-dive-block-1/deep-dive-block-1.module.html',
})

export class DeepDiveBlock1 implements OnInit {
  videoDataTop:  Array<VideoStackData>;
  videoDataBatch: Array<VideoStackData>;
  firstStackTop: Array<ArticleStackData>;
  firstStackRow: Array<ArticleStackData>
  scope: string = "nfl";//TODO
  geoLocation: string = "ks";//TODO
  callLimit:number = 8;

  constructor(private _deepDiveData: DeepDiveService){}
  getFirstArticleStackData(){
    this._deepDiveData.getDeepDiveBatchService(this.scope, this.callLimit, 1, this.geoLocation)
        .subscribe(data => {
          console.log(data);
          let stackTop = [data.data[0]];
          let stackRow = data.data.splice(1,8);
          this.firstStackTop = this._deepDiveData.transformToArticleStack(stackTop);
          this.firstStackRow  = this._deepDiveData.transformToArticleStack(stackRow);
          console.log("stackTop", this.firstStackTop, "stackRow", this.firstStackRow);
        },
        err => {
            console.log("Error getting first article stack data");
        });
  }

  getDeepDiveVideo(){
      this._deepDiveData.getDeepDiveVideoBatchService('fbs', 5, 1).subscribe(
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
