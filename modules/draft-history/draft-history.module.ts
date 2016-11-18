import { Component, Output, EventEmitter, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileHeaderService } from '../../../services/profile-header.service';

import { IProfileData } from "../profile-header/profile-header.module";

import { DetailListInput } from '../../components/detailed-list-item/detailed-list-item.component';

@Component({
    selector: 'draft-history-module',
    templateUrl: './app/fe-core/modules/draft-history/draft-history.module.html'
})

export class DraftHistoryModule implements OnInit {

  modHeadData: Object;
  footerData: Object;

  @Input() profileData: IProfileData;

  constructor() {}

  ngOnInit(){
    if ( this.profileData != null ) {
      this.displayData();
    }
  }

  displayData(){
    var pageRoute = '';
    // var pageRoute = this.profileData.profileType == "team" ?
    //   ['Draft-history-page',{teamName: this.profileData.profileName, teamId:this.profileData.profileId}] :
    //   ["Draft-history-mlb-page"];

    this.footerData = {
      infoDesc: 'Want to see the full list?',
      text: 'VIEW THE FULL LIST',
      url: pageRoute
    };
    var title = '';
    if(this.profileData.profileType == 'league'){
      title = this.profileData['headerData'].leagueAbbreviatedName;
      this.profileData.profileName = "";
    }else{
      title = this.profileData['headerData'].teamMarket;
    }
    this.modHeadData = {
        moduleTitle: "Draft History",
        moduleIdentifier: " - " + title + " " + this.profileData.profileName,
        hasIcon: false,
        iconClass: '',
    }
  }
}
