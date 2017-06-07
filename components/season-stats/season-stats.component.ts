import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

//interfaces
import { SliderCarouselInput } from '../carousels/slider-carousel/slider-carousel.component';
import { Tabs } from '../tabs/tabs.component';
import { Tab } from '../tabs/tab.component';
import { TableModel } from '../custom-table/table-data.component';

export interface TableTabData<T> {
  title: string;
  year: string;
  tabName: string;
  isActive: boolean;
  isLoaded: boolean;
  hasError: boolean;
  sections: any;
  convertToCarouselItem(item:T, index:number, scope?):SliderCarouselInput
}

export interface TableComponentData<T> {
  groupName: string;
  tableData: TableModel<T>;
}

@Component({
  selector: "season-stats-component",
  templateUrl: "./season-stats.component.html"
})

export class SeasonStatsComponent {
    @Input() tabs: Array<TableTabData<any>>;
    @Input() selectedTabTitle;
    @Input() carData;

    @Output("tabSelected") tabSelectedListener = new EventEmitter();

    public selectedIndex;
    public carouselData: Array<SliderCarouselInput> = [];
    private tabsLoaded: {[index:number]:string};
    private noDataMessage = "Sorry, there is no data available.";

    constructor() {}


    ngOnChanges(event) {
        this.tabSelected(this.selectedTabTitle);
    } //ngOnChanges




    getSelectedTab(tabTitle): TableTabData<any> {
        let selectedSeason;
        if ( tabTitle == 'Current Season' ) { selectedSeason = this.tabs[0].year }
        else if ( tabTitle == 'Career Stats' ) { selectedSeason = 'career' }
        else { selectedSeason = tabTitle }

        var matchingTabs = this.tabs.filter(value => value.year === selectedSeason);
        if ( matchingTabs.length > 0 && matchingTabs[0] !== undefined ) {
            if ( matchingTabs[0] ) {
                this.updateCarousel(matchingTabs[0]);
                return matchingTabs[0];
            }
        }
        else {
          return null;
        }
    } //getSelectedTab



    tabSelected(tabTitle) {
        this.selectedTabTitle = tabTitle;
        let selectedTab = this.getSelectedTab(tabTitle);
        this.tabSelectedListener.emit(selectedTab);
    } //tabSelected



    updateCarousel(selectedTab) {
        if ( selectedTab === undefined || selectedTab === null ) {
            return;
        }

        let carouselData: Array<SliderCarouselInput> = [];
        let index = 0;
        let selectedIndex = -1;

        if ( selectedTab.sections && selectedTab.sections.length ) {
            selectedTab.sections.forEach(section => {
                section.tableData.rows
                .map((value) => {
                    let item = selectedTab.convertToCarouselItem(value, index, 'nfl');
                    if ( section.tableData.isRowSelected(value, index) ) {
                        selectedIndex = index;
                    }
                    index++;
                    return item;
                })
                .forEach(value => {
                    carouselData.push(value);
                });
            });
        }
        else {}

        this.selectedIndex = selectedIndex < 0 ? 0 : selectedIndex;
        this.carouselData = carouselData;
        return;
    } // updateCarousel
}
