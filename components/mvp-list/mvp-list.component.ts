import {Component, DoCheck, Output, EventEmitter, Input} from '@angular/core';
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

export class MVPListComponent implements DoCheck  {
  @Output("tabSelected") tabSelectedListener = new EventEmitter();

  @Input() tabs: Array<MVPTabData>;

  @Input() carouselFooter: FooterStyle;

  detailedDataArray: DetailListInput[]; //variable that is just a list of the detailed DataArray

  carouselDataArray: Array<SliderCarouselInput>;

  @Input() selectedTabTitle: string;

  tabsLoaded: {[index:number]:string};

  private sortOptions: Array<any> = [
    {key: '1', value: 'Cornerback'},
    {key: '2', value: 'Defensive end'},
    {key: '3', value: 'Defensive back'},
    {key: '4', value: 'Defensive lineman'},
    {key: '5', value: 'Defensive tackle'},
    {key: '6', value: 'Safety'},
    {key: '7', value: 'Linebacker'},
    {key: '7', value: 'Kicker'},
    {key: '8', value: 'Punter'},
    {key: '9', value: 'Quarterback'},
    {key: '10', value: 'Running back'},
    {key: '11', value: 'Return specialist'},
    {key: '12', value: 'Wide receiver'},
    {key: '13', value: 'Tight end'}
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
        if ( selectedTab && selectedTab.listData && selectedTab.listData.length > 0 && !this.tabsLoaded[selectedTab.tabDisplayTitle] ) {
          this.tabsLoaded[selectedTab.tabDisplayTitle] = "1";
          this.updateCarousel(selectedTab);
        }
      }
    }
  } //ngDoCheck()

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
        this.tabSelectedListener.next(selectedTab);
      }
      else {
        this.tabSelectedListener.next(selectedTab);
        this.updateCarousel(selectedTab);
      }
    }
  }

  updateCarousel(tab: MVPTabData) {
    if ( tab.listData.length == 0 ) {
      this.carouselDataArray = tab.getCarouselData()
    }
    else {
      this.carouselDataArray = tab.getCarouselData();
      this.detailedDataArray = tab.listData;
    }
  }
}
