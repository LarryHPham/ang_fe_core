import { Component, Input } from '@angular/core';
import { GlobalFunctions } from "../../../global/global-functions";

//interfaces
import { VideoStackData } from "../../interfaces/deep-dive.data";

//pipes
import { SanitizeHtml } from "../../pipes/safe.pipe";

declare var moment;

@Component({
  selector: 'video-stack-component',
  templateUrl: './app/fe-core/components/video-stack/video-stack.component.html'
})

export class VideoStackComponent {
  public articleData: any;

  @Input() videoData: Array<VideoStackData>;
  @Input() state: any;
  @Input() page: number;
  @Input() isProfilePage:boolean;

  formatDate(date, isProfilePage) {
    return isProfilePage ? GlobalFunctions.sntGlobalDateFormatting(date,"timeZone") : GlobalFunctions.sntGlobalDateFormatting(date,"dayOfWeek");
  }
}
