import {Component, Input, OnInit} from '@angular/core';
import { isBrowser } from 'angular2-universal';

@Component({
    selector: 'sidekick-container-component',
    templateUrl: './sidekick-container.component.html'
})

export class SidekickContainerComponent implements OnInit{
    isSmall:boolean = false;
    @Input() scope: string;
    @Input() trending: string;
    isProSport = true;

    onResize(event) {
      this.isSmall = event.target.innerWidth < 640;
    }
    ngOnInit() {
      this.isProSport = this.scope == 'nfl' ? true : false;
      if (isBrowser) {
        this.isSmall = window.innerWidth < 640;
      }
    }
}
