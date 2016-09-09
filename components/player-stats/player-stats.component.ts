import {Component, Input, OnInit, DoCheck, Output, EventEmitter} from '@angular/core';

import {SliderCarousel, SliderCarouselInput} from '../carousels/slider-carousel/slider-carousel.component';
import {Tabs} from '../tabs/tabs.component';
import {Tab} from '../tabs/tab.component';
import {CustomTable} from '../custom-table/custom-table.component';
import {TableModel, TableColumn} from '../custom-table/table-data.component';
import {DropdownComponent} from '../../components/dropdown/dropdown.component';
import {LoadingComponent} from '../../components/loading/loading.component';
import {NoDataBox} from '../../components/error/data-box/data-box.component';
import {GlossaryComponent} from "../glossary/glossary.component";
import {ResponsiveWidget} from "../responsive-widget/responsive-widget.component";




export interface StatsTableTabData<T> {

    tabTitle: string;
    isActive: boolean;
    isLoaded: boolean;
    hasError: boolean;
    tableData: TableModel<T>;
    seasonIds: Array<{key: string, value: string}>;
    glossary: Array<{key: string, value: string}>;
    convertToCarouselItem(item:T, index:number):SliderCarouselInput
}

@Component({
    selector: "player-stats-component",
    templateUrl: "./app/fe-core/components/player-stats/player-stats.component.html",
    directives: [SliderCarousel, Tabs, Tab, CustomTable, DropdownComponent, LoadingComponent, NoDataBox, GlossaryComponent,ResponsiveWidget],
})
export class PlayerStatsComponent implements DoCheck{
    private initialSeasonId: string;
    public selectedIndex;
    public GlossaryData;
    public rowCount;
    isLessThanTen:boolean;
    public carouselData: Array<SliderCarouselInput> = [];
    @Input() tabName;

    @Input() tabs: Array<StatsTableTabData<any>>;

    @Input() showGlossary: boolean;

    @Output("tabSelected") tabSelectedListener = new EventEmitter();
    private isSpecialTeam:boolean;
    private selectedTabTitle: string;
    private tabsLoaded: {[key: string]: string};
    private selectedSeasonId: string;
    private initialSeasonId: string;
    private noDataMessage = "Sorry, there is no data available.";
    private selectedSubTab:string;

    constructor() {}

    ngDoCheck() {

        if ( this.tabs && this.tabs.length > 0 ) {
            if ( !this.tabsLoaded  ) {
                this.tabsLoaded = {};
                var selectedTitle = this.tabs[0].tabTitle;
                this.tabs.forEach(tab => {
                    if ( tab.isActive ) {
                        selectedTitle = tab.tabTitle;
                    }
                });
                this.tabSelected(selectedTitle);
            }
            else {
                for ( var i = 0; i < this.tabs.length; i++ ) {
                    if ( this.tabs[i].isLoaded && !this.tabsLoaded[i] ) {
                        this.updateCarousel();
                        this.tabsLoaded[i] = "1";
                    }
                }
            }
        }
    }
    dropdown2Changed($event) {
        console.log(this.tabName,"is this work");
        this.selectedSubTab = $event;
        //this.tabSelectedListener.emit(this.selectedSubTab);
        let matchingTabs = this.tabs.filter(value => value.tabTitle === this.selectedTabTitle);

        if ( matchingTabs.length > 0 && matchingTabs[0] !== undefined ) {
            let selectedTab = matchingTabs[0];
            this.tabSelectedListener.next([selectedTab, $event]);

            this.updateCarousel();
            this.updateGlossary();
        }
    }
    dropdownChanged($event) {
        console.log(this.tabName,"is this work");
        this.selectedSeasonId = $event;
        let matchingTabs = this.tabs.filter(value => value.tabTitle === this.selectedTabTitle);
        if ( matchingTabs.length > 0 && matchingTabs[0] !== undefined ) {
            let selectedTab = matchingTabs[0];
            this.tabSelectedListener.next([selectedTab, $event]);

            this.updateCarousel();

        }
    }

    getSelectedTab(): StatsTableTabData<any> {
        var matchingTabs = this.tabs.filter(value => value.tabTitle === this.selectedTabTitle);
        if ( matchingTabs.length > 0 && matchingTabs[0] !== undefined ) {
            return matchingTabs[0];
        }
        else {
            return null;
        }
    }

    tabSelected(newTitle) {
        this.selectedTabTitle = newTitle;
        this.isSpecialTeam = newTitle == "Special Teams" ? true : false;
        this.noDataMessage = "Sorry, there are no " + newTitle + " stats available.";

        this.initialSeasonId="2015";
        if (this.selectedSeasonId != this.initialSeasonId) {
             this.selectedSeasonId=this.initialSeasonId;
        }

        this.tabSelectedListener.next([this.getSelectedTab(), this.initialSeasonId]);
        this.updateCarousel();
        this.updateGlossary();
    }

    indexNum($event) {
        let selectedIndex = Number($event);
        let matchingTabs = this.tabs.filter(value => value.tabTitle === this.selectedTabTitle);
        if ( matchingTabs.length > 0 && matchingTabs[0] !== undefined ) {
            let selectedTab = matchingTabs[0];
            if ( selectedTab.tableData ) {
                selectedTab.tableData.setRowSelected(selectedIndex);
            }
        }
    }

    updateCarousel(sortedRows?) {
        var selectedTab = this.getSelectedTab();
        if ( !selectedTab || !selectedTab.tableData ) {

            return;
        }

        let carouselData: Array<SliderCarouselInput> = [];
        let index = 0;
        let selectedIndex = -1;
        this.rowCount=selectedTab.tableData.rows.length;
        this.rowCount<10?this.isLessThanTen=true:this.isLessThanTen=false;

        selectedTab.tableData.rows.map((value) => {
            let item = selectedTab.convertToCarouselItem(value, index);
            if ( selectedTab.tableData.isRowSelected(value, index) ) {
                selectedIndex = index;
            }
            index++;
            return item;
        })
            .forEach(value => {
                carouselData.push(value);
            });

        this.selectedIndex = selectedIndex < 0 ? 0 : selectedIndex;
        this.carouselData = carouselData;
    }
    updateGlossary(){
        var tabchosen= this.getSelectedTab();

        this.GlossaryData=tabchosen.glossary;



    }

}
