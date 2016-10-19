import { Component, OnInit, Input } from '@angular/core';
import { DeepDiveService } from '../../../../services/deep-dive.service';
import { ArticleStackData, SectionNameData } from "../../../interfaces/deep-dive.data";

declare var moment;

@Component({
  selector: 'deep-dive-block-3',
  templateUrl: './app/fe-core/modules/deep-dive-blocks/deep-dive-block-3/deep-dive-block-3.module.html',
})

export class DeepDiveBlock3 implements OnInit {
  @Input() scope: string;
  firstStackTop: Array<ArticleStackData>;
  firstStackRow: Array<ArticleStackData>;
  recData: Array<ArticleStackData>;//TODO
  articleStack2DataTop: Array<ArticleStackData>;//TODO
  articleStack2DataBatch: Array<ArticleStackData>;//TODO
  geoLocation: string = "ks";//TODO
  articleCallLimit:number = 23;
  batchNum: number = 1;

  constructor(private _deepDiveData: DeepDiveService){}
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

  callModules(){
    this.getFirstArticleStackData();
  }

  ngOnChanges() {
    this.callModules();
  }

  ngOnInit() {
    this.callModules();
  }
}
