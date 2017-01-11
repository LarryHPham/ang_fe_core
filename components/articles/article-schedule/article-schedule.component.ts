import { Component, Input } from "@angular/core";

@Component({
  selector: 'article-schedule-component',
  templateUrl: './article-schedule.component.html'
})

export class ArticleScheduleComponent {
  @Input() homeData:any;
  @Input() awayData:any;
  @Input() defaultGradient:any;
  @Input() fullGradient:any;
}
