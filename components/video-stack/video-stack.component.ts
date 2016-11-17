import { Component, Input } from '@angular/core';
import { VideoStackData } from "../../interfaces/deep-dive.data";

declare var moment;

@Component({
  selector: 'video-stack-component',
  templateUrl: './app/fe-core/components/video-stack/video-stack.component.html',
})

export class VideoStackComponent{
  @Input() videoData: Array<VideoStackData>;
}
