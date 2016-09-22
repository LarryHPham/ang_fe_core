import {Component,OnInit, Input} from '@angular/core';
// import {SanitizeHtml} from "../../pipes/safe.pipe";

declare var moment;

@Component({
  selector: 'video-stack-component',
  templateUrl: './app/fe-core/components/video-stack/video-stack.component.html',
  // pipes: [SanitizeHtml]
})

export class VideoStackComponent implements OnInit{
  public articleData: any;
  @Input() state: any;
  @Input() page: number;
  @Input() videoData: any;
  @Input() isProfilePage:boolean;

  formatDate(date, isProfilePage) {
    return isProfilePage ? moment(date, "YYYY-MM-Do").format("MM DD, YYYY | HH:MM") : moment(date, "YYYY-MM-Do").format("MMMM DD, YYYY");
  }
  ngOnInit() {
  }
}
