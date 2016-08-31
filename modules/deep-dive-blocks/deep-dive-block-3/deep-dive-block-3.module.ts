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
    selector: 'deep-dive-block-3',
    templateUrl: './app/fe-core/modules/deep-dive-blocks/deep-dive-block-3/deep-dive-block-3.module.html',
    directives: [ROUTER_DIRECTIVES, ArticleStackModule, TileStackModule, ResponsiveWidget, VideoStackComponent, RecommendationsComponent],
    providers: [DeepDiveService]
})
export class DeepDiveBlock3{
  public widgetPlace: string = "widgetForPage";
  thirdStackTop: any;
  thirdStackRow: any;
  callLimit:number = 9;
  tilestackData: any;
  videoData: any;
  page: number = 3;
  recommendationData: any;
  boxArticleData: any;
  partnerID:string;
  scope: string;
  scroll: boolean = true;
  @Input() maxHeight: any;
  @Input() geoLocation: any;
  @Input() profileName: any;

  constructor(
    private _router:Router,
    private _deepDiveData: DeepDiveService
    ){
      GlobalSettings.getParentParams(_router, parentParams => {
        this.partnerID = parentParams.partnerID;
        this.scope = parentParams.scope;
        console.log(this.partnerID, this.scope);
      })
    }
    ngOnInit() {
       this.callModules();
    }
  getThirdArticleStackData(){
    this._deepDiveData.getDeepDiveBatchService(this.scope, this.callLimit, 3, this.geoLocation)
        .subscribe(data => {
          this.thirdStackTop = this._deepDiveData.transformToArticleStack(data);
          this.thirdStackRow = this._deepDiveData.transformToArticleRow(data);
        },
        err => {
            console.log("Error getting third article batch data");
        });
  }
  getTileStackData(){
    this._deepDiveData.getDeepDiveBatchService(this.scope, this.callLimit, 2, this.geoLocation)
        .subscribe(data => {
          this.tilestackData = this._deepDiveData.transformTileStack(data);
        });
  }
  getRecommendationData(){
    var state = this.geoLocation; //required from AI to have the call of state come in UPPERCASE
    this._deepDiveData.getRecArticleData(state, '2', '1')
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
    this.getDeepDiveVideoBatch(this.geoLocation, 6, this.page);
    this.getThirdArticleStackData();
    this.getTileStackData();
  }

}
