import { Component, Input, OnInit } from '@angular/core';
import { VideoStackData } from "../../interfaces/deep-dive.data";

@Component({
  selector: 'deep-dive-video-module',
  templateUrl: './video-deep-dive.module.html',
})

export class DeepDiveVideoModule implements OnInit{
  @Input() videoData: Array<VideoStackData>;
  ngOnInit() {}
}
