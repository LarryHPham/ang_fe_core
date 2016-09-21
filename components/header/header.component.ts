import {Component, Input, OnInit, OnChanges, Output, EventEmitter, ElementRef, Renderer} from '@angular/core';

declare var stButtons: any;
declare var jQuery:any;

@Component({
    selector: 'header-component',
    templateUrl: './app/fe-core/components/header/header.component.html',
})
export class HeaderComponent {
  @Input() title:string;
}
