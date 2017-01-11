import { Component, Input }  from "@angular/core";

@Component({
  selector: 'fantasy-module',
  templateUrl: './fantasy.module.html'
})

export class FantasyModule {
  @Input() fantasyData;
  @Input() footerData;
  @Input() modHeadData;
}
