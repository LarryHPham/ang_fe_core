import {Component, Input, Injector, OnChanges} from '@angular/core';
import {GlobalSettings} from '../../../../global/global-settings';
import {GlobalFunctions} from '../../../../global/global-functions';
import {DeepDiveService} from '../../../../services/deep-dive.service';
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {ArticleStackModule} from '../../../modules/article-stack/article-stack.module';
import {TileStackModule} from '../../../modules/tile-stack/tile-stack.module';
import {ResponsiveWidget} from '../../../components/responsive-widget/responsive-widget.component';
import {VideoStackComponent} from '../../../components/video-stack/video-stack.component';
import {RecommendationsComponent} from '../../../components/articles/recommendations/recommendations.component';

@Component({
    selector: 'deep-dive-block-2',
    templateUrl: './app/fe-core/modules/deep-dive-blocks/deep-dive-block-2/deep-dive-block-2.module.html',
    directives: [ROUTER_DIRECTIVES, ArticleStackModule, TileStackModule, ResponsiveWidget, VideoStackComponent, RecommendationsComponent],
    providers: [DeepDiveService]
})
export class DeepDiveBlock2{
  public widgetPlace: string = "widgetForPage";
  secStackTop: any;
  secStackRow: any;
  callLimit:number = 9;
  videoCallLimit: number = 6;
  tilestackData: any;
  videoData: any;
  page: number = 2;
  recommendationData: any;
  boxArticleData: any;
  partnerID:string;
  scope: string;
  scroll: boolean = true;
  @Input() maxHeight: any;
  @Input() geoLocation: any;
  @Input() profileName: any;

  constructor(private _router:Router, private _deepDiveData: DeepDiveService){
      GlobalSettings.getParentParams(_router, parentParams => {
        this.partnerID = parentParams.partnerID;
        this.scope = parentParams.scope;
      })
  }
  ngOnInit() {
     this.callModules();
  }
  getSecArticleStackData(){
    this._deepDiveData.getDeepDiveBatchService(this.scope, this.callLimit, 2, this.geoLocation)
        .subscribe(data => {
          this.secStackTop = this._deepDiveData.transformToArticleStack(data);
          this.secStackRow = this._deepDiveData.transformToArticleRow(data);
        },
        err => {
            console.log("Error getting second article batch data");
        });
  }

  getRecommendationData(){
    //var state = this.geoLocation; //required from AI to have the call of state come in UPPERCASE
    this._deepDiveData.getRecArticleData(this.scope)
        .subscribe(data => {
          this.recommendationData = this._deepDiveData.transformToRecArticles(data);
        });
  }
  private getDeepDiveVideoBatch(region, numItems, startNum){
    this._deepDiveData.getDeepDiveVideoBatchService(this.scope, numItems, startNum, region).subscribe(
      data => {
        this.videoData = data.data;
      }
    )
  }

  callModules(){
    this.getRecommendationData();
    this.getSecArticleStackData();
    this.getDeepDiveVideoBatch(this.geoLocation, this.videoCallLimit, this.page);
  }

}
