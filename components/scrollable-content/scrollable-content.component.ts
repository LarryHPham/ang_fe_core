import {Component, Input, Inject, OnChanges, AfterViewInit, AfterViewChecked, ElementRef} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import {ScrollerFunctions} from '../../../global/scroller-functions';

@Component({
    selector: 'scrollable-content',
    templateUrl: './scrollable-content.component.html'
})
export class ScrollableContent implements AfterViewInit, OnChanges {
  private _elementRef: ElementRef;
  private _afterViewInit: boolean = false;
  private _document:Document;

  //change this input to fire a refresh of the scroller's size
  @Input() refreshVar: string = "";

  constructor(@Inject(ElementRef) elementRef: ElementRef, @Inject(DOCUMENT) private document: Document) {
    this._elementRef = elementRef;
    this._document = document;
  }

  ngAfterViewInit() {
    this.setupScroller();
    this._afterViewInit = true;
  }

  ngOnChanges() {
    if ( this._afterViewInit ) {
      this.setupScroller();
    }
  }

  setupScroller() {
    var nativeElement = this._elementRef.nativeElement;
    ScrollerFunctions.initializeScroller(nativeElement, this._document);
  }
}
