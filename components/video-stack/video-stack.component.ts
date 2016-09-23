import {Component, Input} from '@angular/core';
// import {SanitizeHtml} from "../../pipes/safe.pipe";
import { VideoStackData } from "../../interfaces/deep-dive.data";

declare var moment;

@Component({
  selector: 'video-stack-component',
  templateUrl: './app/fe-core/components/video-stack/video-stack.component.html',
  // pipes: [SanitizeHtml]
})

export class VideoStackComponent{
  @Input() videoData: Array<VideoStackData>;

  // formatDate(date, isProfilePage) {
  //   return isProfilePage ? moment(date, "YYYY-MM-Do").format("MM DD, YYYY | HH:MM") : moment(date, "YYYY-MM-Do").format("MMMM DD, YYYY");
  // }
}
