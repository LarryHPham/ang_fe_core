import { Component, Output, EventEmitter, Injectable, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

//interface
import { IProfileData } from "../profile-header/profile-header.module";
import { DetailListInput } from '../../components/detailed-list-item/detailed-list-item.component';

@Component({
    selector: 'draft-history-module',
    templateUrl: './draft-history.module.html'
})

export class DraftHistoryModule implements OnInit {
  @Output() tabSelectedListener = new EventEmitter();
  @Output() dropdownSelectedListener = new EventEmitter();

  @Input() profileData: IProfileData;
  @Input() type: string;
  @Input() carouselDataArray;
  @Input() data: any;
  @Input() sortOptions: any;
  @Input() dropdownKey1;
  @Input() selectedTabName;
  @Input() isError: boolean;
  @Input() pageParams: any;
  @Input() storedPartnerParam: string;

  modHeadData: Object;
  partnerIdParam: string;
  footerData: Object;

  constructor() {}

    ngOnInit() {} //ngOnInit



    ngOnChanges(event) {
        this.displayData();
    } //ngOnChanges



    selectedTab(tabTitle) {
        this.tabSelectedListener.next(tabTitle);
    } //selectedTab



    dropdownChanged(event) {
        this.dropdownSelectedListener.next(event);
    }



    displayData() {
        var filter = this.dropdownKey1 == '1' ? 'asc' : 'desc';
        var pageRoute = this.profileData.profileType == 'team' ?
                        [this.storedPartnerParam, this.pageParams.scope, 'draft-history', this.selectedTabName, this.pageParams.teamName, this.pageParams.teamID, filter] :
                        [this.storedPartnerParam, this.pageParams.scope, 'draft-history', this.selectedTabName, this.profileData.profileType, filter];
        var title = '';
        this.footerData = {
            infoDesc: 'Want to see the full list?',
            text: 'VIEW THE FULL LIST',
            url: pageRoute
        };
        if(this.profileData.profileType == 'league'){
            title = this.profileData['headerData'].leagueAbbreviatedName;
            this.profileData.profileName = "";
        } else {
            title = this.profileData['headerData'].teamMarket;
        }
        this.modHeadData = {
            moduleTitle: "Draft History",
            moduleIdentifier: " - " + title + " " + this.profileData.profileName,
            hasIcon: false,
            iconClass: '',
        }
    } //displayData
}
