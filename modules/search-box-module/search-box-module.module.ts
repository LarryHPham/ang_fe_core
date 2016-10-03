import { Component, Input, Output, OnInit, OnDestroy, EventEmitter, ElementRef } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'search-box-module',
  templateUrl: './app/fe-core/modules/search-box-module/search-box-module.module.html'
})

export class SearchBoxModule {
  @Input() scope: string;
  sportsList=[{
      MLB:"MLB",
  },
      {
          NFL:'NFL',
      },
      {
          NBA:'NBA',
      }]
  searchBoxDescription: string = 'Find the players and teams you love.';
  searchPlaceHolderText: string = 'Search for a Team or Player...';
  searchBoxBackground: string = '/app/public/header_texture.png';
  baseSearchUrl: string = 'http://touchdownloyal.com/nfl/search/';
  public searchInput: any = {
    placeholderText: "Search for a topic...",
    hasSuggestions: true
  };
  fullSearchUrl: string;

  constructor(private activeRoute:ActivatedRoute) {}

  onKey(event:any) {
    this.fullSearchUrl = this.baseSearchUrl + event.target.value;
  }

  navigateSearch(){
    window.location.assign(this.fullSearchUrl);
  }
  e(eve){
      console.log(eve,"this is event");
  }

}
