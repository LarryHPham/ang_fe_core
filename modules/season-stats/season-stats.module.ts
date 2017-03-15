import { Component, Input, Output, OnInit, EventEmitter, OnChanges} from '@angular/core';

//services
import {SeasonStatsService} from '../../../services/season-stats.service';

//interfaces
import { ModuleHeaderData } from '../../components/module-header/module-header.component';
import { ModuleFooterData } from '../../components/module-footer/module-footer.component';
import { ComparisonBarInput } from '../../components/comparison-bar/comparison-bar.component';
import { ComparisonLegendInput } from '../../components/comparison-legend/comparison-legend.component';
import { Tabs } from '../../components/tabs/tabs.component';
import { Tab } from '../../components/tabs/tab.component';
import { SliderCarousel, SliderCarouselInput } from '../../components/carousels/slider-carousel/slider-carousel.component';
import { SportPageParameters } from '../../../global/global-interface';


export interface SeasonStatsModuleData {
  tabs: Array<SeasonStatsTabData>;
  profileName: string;
  carouselDataItem: SliderCarouselInput;
  pageRouterLink: Array<any>;
  playerInfo: any;
  stats: any;
}

export interface SeasonStatsTabData {
  tabTitle: string;
  comparisonLegendData: ComparisonLegendInput;
  tabData: Array<ComparisonBarInput>;
  longSeasonName: string;
}

@Component({
    selector: 'season-stats-module',
    templateUrl: './season-stats.module.html'
})

export class SeasonStatsModule implements OnChanges {

  @Input() data: SeasonStatsModuleData;
  @Input() pageParams;
  @Input() seasonBase;

  public noDataMessage = "Sorry, there are no values for this season.";
  public moduleHeaderData: ModuleHeaderData;
  public footerData: ModuleFooterData;
  public carouselDataArray: Array<SliderCarouselInput>;
  public profileName: string;
  public selectedTabTitle: string;



  constructor(){}



    ngOnChanges(event) {
        if ( this.data ) {
            this.formatData(this.data);
        }
    } // ngOnChanges



    formatData(data: SeasonStatsModuleData) {
        this.carouselDataArray = [data.carouselDataItem];
        this.footerData  = {
            infoDesc: 'Want to see full statistics for this player?',
            text: 'VIEW FULL STATISTICS',
            url: data.pageRouterLink
        };
        this.profileName = data.profileName;
        if ( this.data.tabs && this.data.tabs.length > 0 ) {
            var selectedTabs = this.data.tabs.filter(tab => tab.tabTitle == this.selectedTabTitle);
            this.formatTitle(selectedTabs && selectedTabs.length > 0 ? selectedTabs[0] : this.data.tabs[0]);
        }
        else {
            this.formatTitle(null);
        }
    } //formatData



    formatTitle(tab: SeasonStatsTabData) {
        this.moduleHeaderData = {
            moduleTitle: (tab ? tab.longSeasonName : 'Season') + ' Stats',
            moduleIdentifier: " - " + this.profileName,
            hasIcon: false,
            iconClass: ''
        };
    } //formatTitle



    tabSelected(tabTitle) {
        this.selectedTabTitle = tabTitle;
        if ( tabTitle == "Career Stats" ) {
            this.noDataMessage = "Sorry, there are no season stats available for this player.";
        }
        else {
            this.noDataMessage = "Sorry, there are no statistics available for " + tabTitle + ".";
        }
        var selectedTabs = this.data.tabs.filter(tab => tab.tabTitle == tabTitle);
        if ( selectedTabs && selectedTabs.length ) {
            let tab = selectedTabs[0];
            let tabTitle = tab.tabTitle == "Current Season" ? this.seasonBase : tab.tabTitle;
            this.carouselDataArray = [SeasonStatsService.getCarouselData(this.data.playerInfo, this.data.stats, tab.longSeasonName, tabTitle)];
            this.formatTitle(tab);
        }
    } //tabSelected
}
