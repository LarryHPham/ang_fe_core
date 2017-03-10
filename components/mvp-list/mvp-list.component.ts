import { Injectable, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//interfaces
import { DetailedListItem, DetailListInput } from '../../components/detailed-list-item/detailed-list-item.component';
import { SliderCarousel, SliderCarouselInput } from '../../components/carousels/slider-carousel/slider-carousel.component';
import { FooterStyle } from '../../components/module-footer/module-footer.component';
import { PaginationParameters } from "../../interfaces/pagination.data";



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
    templateUrl: './mvp-list.component.html'
})

export class MVPListComponent implements OnInit {
  @Output() tabSelectedListener = new EventEmitter();
  @Output() dropdownPositionSelection = new EventEmitter();

  @Input() tabData;
  @Input() tabs;
  @Input() selectedTabTitle: string;
  @Input() selectedFilterTitle: string;
  @Input() position: string;
  @Input() sortOptions: Array<any>;

  detailedDataArray: DetailListInput[]; //variable that is just a list of the detailed DataArray
  carouselDataArray: Array<any>;
  dropDownFirstRun: boolean = true;
  tabsLoaded: {[index:number]:string};
  listType: string;
  displayTab: string;
  dropdownSelectedKey: string = 'cb';


  constructor( private activateRoute: ActivatedRoute ) {
    this.activateRoute.params.subscribe(
      (param :any) => {
        this.listType = param['type'] ? param['type'] : null;
        this.displayTab = param['tab'] ? param['tab'] : null;
      }
    )
  }



  ngOnInit(){
      if (this.listType == null ) {
        this.position = this.position == null ? this.dropdownSelectedKey : this.position;
      }
      else {
        this.position = this.listType;
      }
  } //ngOnInit



    ngOnChanges(event) {
        if ( this.tabData ) {
            this.detailedDataArray = this.tabData ? this.tabData.listData : null;
            this.updateCarousel(this.tabData);
        }
    } //ngOnChanges



    getSelectedTab(tabTitle) {
        if ( !this.tabs ) return null;
        var matchingTab = this.tabs.filter(tab => tab.tabDisplayTitle == tabTitle);
        return matchingTab.length > 0 ? matchingTab[0] : null;
    } //getSelectedTab()



    //each time a tab is selected the carousel needs to change accordingly to the correct list being shown
    tabSelected(tabTitle){
        var selectedTab = this.getSelectedTab(tabTitle);
        this.tabSelectedListener.next({
            tabDataKey: selectedTab.tabDataKey,
            position:this.position
        });
    } //tabSelected



    dropdownChanged($event) {
        this.dropdownSelectedKey = $event;
        var selectedTab = this.getSelectedTab(this.selectedTabTitle);
        this.dropdownPositionSelection.next({
            tab: selectedTab.tabDataKey,
            position: $event //position 'key' value
        });
    } //dropdownChanged



    updateCarousel(tab: MVPTabData) {
        this.carouselDataArray = tab.getCarouselData();
        this.detailedDataArray = tab.listData;
    } //updateCarousel
}
