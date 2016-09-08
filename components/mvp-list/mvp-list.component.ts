import {Component, OnInit, DoCheck, Output, EventEmitter, Input} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
import {Injectable} from '@angular/core';

import {DetailedListItem, DetailListInput} from '../../components/detailed-list-item/detailed-list-item.component';
import {SliderCarousel, SliderCarouselInput} from '../../components/carousels/slider-carousel/slider-carousel.component';
import {Tabs} from '../../components/tabs/tabs.component';
import {Tab} from '../../components/tabs/tab.component';
import {NoDataBox} from '../../components/error/data-box/data-box.component';
import {LoadingComponent} from '../../components/loading/loading.component';
import {FooterStyle} from '../../components/module-footer/module-footer.component';
import {DropdownComponent} from '../../components/dropdown/dropdown.component';

import {VerticalGlobalFunctions} from '../../../global/vertical-global-functions';

export interface MVPTabData {
  tabDisplayTitle: string;
  tabDataKey: string;
  errorData: any;
  isLoaded: boolean;
  listData: DetailListInput[];
  getCarouselData(): Array<SliderCarouselInput>;
}

@Component({
    selector: 'mvp-list',
    templateUrl: './app/fe-core/components/mvp-list/mvp-list.component.html',
    directives: [SliderCarousel, DetailedListItem, Tabs, Tab, NoDataBox, LoadingComponent, DropdownComponent],
})

export class MVPListComponent implements DoCheck, OnInit  {
  @Output() tabSelectedListener = new EventEmitter();
  @Output() dropdownPositionSelection = new EventEmitter();

  @Input() tabs: Array<MVPTabData>;

  @Input() carouselFooter: FooterStyle;

  @Input() selectedTabTitle: string;

  @Input() position: string;

  detailedDataArray: DetailListInput[]; //variable that is just a list of the detailed DataArray
  carouselDataArray: Array<SliderCarouselInput>;
  dropDownFirstRun: boolean = true;
  tabsLoaded: {[index:number]:string};

  listType: string;
  displayTab: string;
  displayPositionAbbrv: string;
  displayTabTitle: string;

  dropdownSelectedKey: string = 'cb';

  private sortOptions: Array<any> = [
    {key: 'cb', value: 'CB'},
    {key: 'db', value: 'DB'},
    {key: 'de', value: 'DE'},
    {key: 'dl', value: 'DL'},
    {key: 'dt', value: 'DT'},
    {key: 'k', value: 'K'},
    {key: 'lb', value: 'L'},
    {key: 'p', value: 'P'},
    {key: 'qb', value: 'QB'},
    {key: 'rb', value: 'RB'},
    {key: 'rs', value: 'RS'},
    {key: 'saf', value: 'S'},
    {key: 'te', value: 'TE'},
    {key: 'wr', value: 'WR'},
  ];


  ngDoCheck() {
    if ( this.tabs && this.tabs.length > 0 ) {
      if ( !this.tabsLoaded  ) {
        this.tabsLoaded = {};
        if ( !this.selectedTabTitle ) {
          this.selectedTabTitle = this.tabs[0].tabDisplayTitle;
        }

        this.tabSelected(this.selectedTabTitle);
      }
      else {
        let selectedTab = this.getSelectedTab();

        //Only run update carousel on first run
        if ( selectedTab && selectedTab.listData && selectedTab.listData.length > 0 && !this.tabsLoaded[selectedTab.tabDisplayTitle]) {
          if (this.carouselDataArray != null && this.carouselDataArray[0].description[0].textData[0].text != selectedTab.getCarouselData()[0].description[0].textData[0].text) {
            this.updateCarousel(selectedTab);
          }
          else if (this.carouselDataArray == null) {
            this.updateCarousel(selectedTab);
          }
          //this.tabsLoaded[selectedTab.tabDisplayTitle] = "qb";
        }
      }
    }
  } //ngDoCheck()

  constructor(private _params: RouteParams) {
    this.listType = _params.get("type");
    this.displayTab = _params.get("tab");

    this.displayPositionAbbrv = this.listType.toUpperCase();
    this.displayTabTitle = VerticalGlobalFunctions.formatStatName(this.displayTab);
  }

  ngOnInit(){
      if (this.listType == null ) {
        this.position = this.position == null ? this.dropdownSelectedKey : this.position;
      }
      else {
        this.position = this.listType;
      }
  }

  getSelectedTab() {
    if ( !this.tabs ) return null;

    var tabTitle = this.selectedTabTitle;
    var matches = this.tabs.filter(tab => tab.tabDisplayTitle == tabTitle);

    return matches.length > 0 ? matches[0] : null;
  } //getSelectedTab()

  //each time a tab is selected the carousel needs to change accordingly to the correct list being shown
  tabSelected(tabTitle){
    this.selectedTabTitle = tabTitle;
    var selectedTab = this.getSelectedTab();

    if ( selectedTab ) {
      this.detailedDataArray = null;
      if(!selectedTab.listData){
        selectedTab.isLoaded = false;
        this.tabSelectedListener.next({
          tab:selectedTab,
          position:this.position
        });
      }
      else {
        this.tabSelectedListener.next({
          tab: selectedTab,
          position: this.position
        });
        this.updateCarousel(selectedTab);
      }
    }
  } //tabSelected

  updateCarousel(tab: MVPTabData) {
    if ( tab.listData.length == 0 ) {
      this.carouselDataArray = tab.getCarouselData()
    }
    else {
      this.carouselDataArray = tab.getCarouselData();
      this.detailedDataArray = tab.listData;
    }

    this.dropdownSelectedKey = this.position == null ? this.dropdownSelectedKey  : this.position;
  } //updateCarousel

  ngOnChanges() {
    // reset dropdown when new datapoints have populated
    var matches = this.tabs.filter(tab => tab.tabDisplayTitle == this.selectedTabTitle);
    if(matches.length > 0){
      this.selectedTabTitle = matches[0].tabDisplayTitle;
    }else{
      this.selectedTabTitle = this.tabs[0].tabDisplayTitle;
    }
    this.dropDownFirstRun = true;
  }

  dropdownChanged($event) {
    this.dropDownFirstRun = false;
    this.position = $event;
    this.dropdownPositionSelection.next({
      tab: this.getSelectedTab(),
      position: $event //position 'key' value
    });
    this.dropdownSelectedKey = this.position == null ? this.dropdownSelectedKey  : this.position;
  }
}
