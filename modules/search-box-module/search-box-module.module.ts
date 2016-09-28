import { Component, Input, Output, OnInit, OnDestroy, EventEmitter, ElementRef } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'search-box-module',
  templateUrl: './app/fe-core/modules/search-box-module/search-box-module.module.html'
})

export class SearchBoxModule {
  scope: string = 'NFL';
  searchBoxDescription: string = 'Find the players and teams you love.';
  searchPlaceHolderText: string = 'Search for a Team or Player...';
  searchBoxBackground: string = '/app/public/header_texture.png';
  baseSearchUrl: string = 'http://touchdownloyal.com/nfl/search/';
  fullSearchUrl: string;

  constructor() {}

  onKey(event:any) {
    this.fullSearchUrl = this.baseSearchUrl + event.target.value;
  }

  navigateSearch(){
    window.location.assign(this.fullSearchUrl);
  }

}
