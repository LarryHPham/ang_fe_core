import { Component, OnInit, Input } from '@angular/core';
import { DeepDiveService } from '../../../../services/deep-dive.service';
import { VideoStackData } from "../../../interfaces/deep-dive.data";

declare var moment;

@Component({
  selector: 'deep-dive-block-1',
  templateUrl: './app/fe-core/components/video-stack/video-stack.component.html',
})

export class DeepDiveBlock1 implements OnInit {
  videoDataTop: Array<VideoStackData>;
  videoDataBatch: Array<VideoStackData>;
  constructor(private _deepDiveData: DeepDiveService){}

  getDeepDiveVideo(){
      this._deepDiveData.getDeepDiveVideoBatchService('fbs', 5, 1).subscribe(
        data => {
          let videoOne = [data.data[0]];
          let videoBatch = data.data.splice(1,5);
          this.videoDataTop = videoOne;
          this.videoDataBatch = videoBatch;
          // console.log(this.videoDataTop, this.videoDataBatch);
        },
        err => {
          console.log("Error getting video batch data");
      });
  }

  callModules(){
    this.getDeepDiveVideo();
  }

  ngOnInit() {
    this.callModules();
  }
}
