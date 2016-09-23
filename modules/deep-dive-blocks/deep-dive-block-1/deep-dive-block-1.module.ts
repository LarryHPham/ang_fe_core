import { Component, OnInit, Input } from '@angular/core';
import { DeepDiveService } from '../../../../services/deep-dive.service';
// import {SanitizeHtml} from "../../pipes/safe.pipe";
declare var moment;

@Component({
  selector: 'deep-dive-block-1',
  templateUrl: './app/fe-core/components/video-stack/video-stack.component.html',
  // pipes: [SanitizeHtml]
})

export class DeepDiveBlock1 implements OnInit {
  videoData: any; //TODO
  constructor(private _deepDiveData: DeepDiveService){}

  private getDeepDiveVideoBatch(){
    this._deepDiveData.getDeepDiveVideoBatchService('fbs', 5, 1).subscribe(
      data => {
        this.videoData = data.data;
      },
      err => {
          console.log("Error getting video batch data");
      });
  }

  callModules(){
    this.getDeepDiveVideoBatch();
  }

  ngOnInit() {
    this.callModules();
  }
}
