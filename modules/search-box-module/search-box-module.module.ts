import { Component, Input, Output, OnInit, OnDestroy, EventEmitter, ElementRef } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'search-box-module',
  templateUrl: './app/fe-core/modules/search-box-module/search-box-module.module.html'
})

export class SearchBoxModule {
  @Input() scope: string;
  modSearchTitle:string;
  modSearchSubTitle:string;

  sportsList=[{
      key:'NFL',
      value:"NFL",
        },
      {
          key:'NCAAF',
          value:"NCAAF",
      },
      {
          key:'NBA',
          value:"NBA",
      },
      {
          key:'NCAAM',
          value:"NCAAM",
      },
      {
          key:'MLB',
          value:"MLB",
      },
      {
          key:'NHL',
          value:"NHL",
      },
      ]
  ngOnInit(){
      this.modSearchTitle="Discover The Latest In " + " " + this.scope;
      this.modSearchSubTitle="Find the players and teams you love";
      console.log(this.scope);


  }
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


}
