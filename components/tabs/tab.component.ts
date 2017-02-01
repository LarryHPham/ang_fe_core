import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
})

export class Tab {
  @Input('tabTitle') title: string;
  @Input() active = false;

  ngOnChanges() {
    console.log('this.title - ',this.title);
    console.log('this.active - ',this.active);
  }
}
