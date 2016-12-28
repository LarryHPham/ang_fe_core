import { Component, Input } from '@angular/core';
import { VideoStackData } from "../../interfaces/deep-dive.data";

@Component({
  selector: 'video-stack-component',
  templateUrl: './video-stack.component.html',
})

export class VideoStackComponent{
  @Input() page: number;
  @Input() isProfilePage:boolean;
  @Input() videoData: Array<VideoStackData>;
}
