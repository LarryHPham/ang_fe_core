import {Component, Input, Injector, OnChanges} from '@angular/core';
import {GlobalSettings} from '../../../../global/global-settings';
import {GlobalFunctions} from '../../../../global/global-functions';
import {DeepDiveService} from '../../../../services/deep-dive.service';
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {ArticleStackModule} from '../../../modules/article-stack/article-stack.module';
import {TileStackModule} from '../../../modules/tile-stack/tile-stack.module';
import {ResponsiveWidget} from '../../../components/responsive-widget/responsive-widget.component';
import {RecommendationsComponent} from '../../../components/articles/recommendations/recommendations.component';

@Component({
    selector: 'deep-dive-block-4',
    templateUrl: './app/fe-core/modules/deep-dive-blocks/deep-dive-block-4/deep-dive-block-4.module.html',
    directives: [ROUTER_DIRECTIVES, ArticleStackModule, TileStackModule, ResponsiveWidget, RecommendationsComponent],
    providers: [DeepDiveService]
})
export class DeepDiveBlock4{
  public widgetPlace: string = "widgetForPage";
  fourthStackTop: any;
  fourthStackRow: any;
  callLimit:number = 1;
  partnerID:string;
  scope: string;
  scroll: boolean = true;
  aiBatchName: string = "player-comparison";
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

  getFourthArticleStackData(){
    this._deepDiveData.getDeepDiveBatchService(this.scope, this.callLimit, 4, this.geoLocation)
        .subscribe(data => {
          this.fourthStackTop = this._deepDiveData.transformToArticleStack(data);
        },
        err => {
              console.log("Error getting forth article stack TOP data");
        });
    this._deepDiveData.getDeepDiveAiHeavyBatchService(this.scope, this.aiBatchName, 1, this.callLimit, this.geoLocation)
        .subscribe(data => {
          this.fourthStackRow = this._deepDiveData.transformToAiHeavyArticleRow(data, 'player-comparisons');
        },
        err => {
            console.log("Error getting forth article stack ROW data");
        });
  }

  callModules(){
    this.getFourthArticleStackData();
  }

}
