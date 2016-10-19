import { Component, Input, Output, OnInit, OnDestroy, EventEmitter, ElementRef } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {GlobalSettings} from "../../../global/global-settings";
import {VerticalGlobalFunctions} from "../../../global/vertical-global-functions";

@Component({
  selector: 'search-box-module',
  templateUrl: './app/fe-core/modules/search-box-module/search-box-module.module.html'
})

export class SearchBoxModule {
  @Input() scope: string;
  @Input() category:string;
  modSearchTitle:string;
  modSearchSubTitle:string;
    ddIcon="caret-down";
    searchPlaceHolderText: string;
    searchBoxBackground:string;

    sportsList=[
       {
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
  ngOnChanges(){
      this.category=="sports"?   this.modSearchTitle=GlobalSettings.getTCXscope(this.scope).searchTitle + " " + this.scope.toUpperCase():this.modSearchTitle=GlobalSettings.getTCXscope(this.scope).searchTitle;
      this.modSearchSubTitle=GlobalSettings.getTCXscope(this.scope).searchSubTitle ;
      this.searchPlaceHolderText=GlobalSettings.getTCXscope(this.scope).placeHolderText;
      this.searchBoxBackground=GlobalSettings.getTCXscope(this.scope).searchBackground;
  }
  //ssearchBoxDescription: string = 'Find the players and teams you love.';
  //searchPlaceHolderText: string = 'Search for a Team or Player...';
  /*searchBoxBackground: string = '/app/public/header_texture.png';*/

  fullSearchUrl: string;

  constructor(private activeRoute:ActivatedRoute, private router:Router) {}

  onKey(event:any) {
      var rel_url= VerticalGlobalFunctions.createSearchLink(this.scope)+ event.target.value;
      this.fullSearchUrl = GlobalSettings.getOffsiteLink(this.scope,rel_url);

  }

  navigateSearch(){
    window.location.assign(this.fullSearchUrl);
  }

    selectedSport(e){
    e=e.toLowerCase();
    this.router.navigate(['/deep-dive',this.category, e]);
}
}
