import { Component, Input } from '@angular/core';

@Component({
    selector: 'sidekick-wrapper',
    templateUrl: './sidekick-wrapper.component.html'
})

export class SidekickWrapper {
  @Input() category: string;
  @Input() subCategory: string;
  @Input() isProfilePage: string;
}
