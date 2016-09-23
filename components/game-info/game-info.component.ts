import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'game-info',
    templateUrl: './app/fe-core/components/game-info/game-info.component.html'
})

export class GameInfo implements OnInit {
    @Input() gameInfo;
    homeInfo:Object;
    awayInfo:Object;
    constructor() {}

    ngOnInit(){
      this.homeInfo = this.gameInfo.homeData;
      this.awayInfo = this.gameInfo.awayData;

      //console.log('game-info.component - ngOnInit - this.homeInfo - ',this.homeInfo);
    }
    ngOnChanges(){
      if(this.gameInfo != null){
        this.homeInfo = this.gameInfo.homeData;
        this.awayInfo = this.gameInfo.awayData;
      }
    }
}
