import { Component, Output, EventEmitter, Injectable, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

//interface
import { IProfileData } from "../profile-header/profile-header.module";
import { DetailListInput } from '../../components/detailed-list-item/detailed-list-item.component';

@Component({
    selector: 'draft-history-module',
    templateUrl: './draft-history.module.html'
})

export class DraftHistoryModule {
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
  @Input() moduleFooterUrl: Array<any>;
  @Input() storedPartnerParam: string;

  modHeadData: Object;
  partnerIdParam: string;
  footerData: Object;

  constructor() {}



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
        var title = '';
        this.footerData = {
            infoDesc: 'Want to see the full list?',
            text: 'VIEW THE FULL LIST',
            url: this.moduleFooterUrl
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
