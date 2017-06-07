import {Component, Input, OnInit, DoCheck, Output, EventEmitter} from '@angular/core';

import {SliderCarouselInput} from '../carousels/slider-carousel/slider-carousel.component';
import {TableModel} from '../custom-table/table-data.component';

export interface RosterTabData<T> {
  title: string;
  tableData: TableModel<T>;
  isLoaded: boolean;
  hasError: boolean;
  errorMessage: string;
  type: string;
  loadData();
  convertToCarouselItem(item:T, index:number):SliderCarouselInput
}

@Component({
  selector: "roster-component",
  templateUrl: "./roster.component.html",
})
export class RosterComponent {
    @Input() tabs: Array<RosterTabData<any>>;
    @Input() selectedTabKey: string;
    @Input() activeTab;

    @Output() tabSelectedListener = new EventEmitter();

    private selectedIndex: number;
    private carDataArray: Array<SliderCarouselInput>
    private selectedKey: string;
    public noDataMessage: string = "No Data Is Available";
    public footerStyle = {
    ctaBoxClass: "list-footer",
    ctaBtnClass:"list-footer-btn",
    hasIcon: true
};



    constructor() {}



    ngOnChanges(event) {
        if ( this.activeTab ) {
          this.activeTab.loadData();
          this.updateCarousel();
        }
    } //ngOnChanges



    tabSelected(newTitle) {
        this.tabSelectedListener.emit(newTitle);
    } //tabSelected



    updateCarousel(sortedRows?) {
        var selectedTab = this.activeTab;
        let carouselData: Array<SliderCarouselInput> = [];
        let selectedIndex = -1;
        if ( selectedTab && selectedTab.tableData ) {
            let table = selectedTab.tableData;
            let index = 0;
            table.rows.map((value) => {
                let item = selectedTab.convertToCarouselItem(value, index);
                if ( table.isRowSelected(value, index) ) {
                  selectedIndex = index;
                }
                index++;
                return item;
            }).forEach(value => {
                carouselData.push(value);
            });
        }
        this.selectedIndex = selectedIndex < 0 ? 0 : selectedIndex;
        this.carDataArray = carouselData;
    } //updateCarousel
}
