import {Component, OnInit, OnChanges, Input} from '@angular/core';

import {DetailedListItem, DetailListInput} from '../../components/detailed-list-item/detailed-list-item.component';
import {SliderCarousel, SliderCarouselInput} from '../../components/carousels/slider-carousel/slider-carousel.component';
import {Tabs} from '../../components/tabs/tabs.component';
import {Tab} from '../../components/tabs/tab.component';
import {ListPageService} from '../../../services/list-page.service';
import {NoDataBox} from '../../components/error/data-box/data-box.component';
import {LoadingComponent} from "../../components/loading/loading.component";
import {ErrorComponent} from "../../components/error/error.component";
import {DraftHistoryTab, DraftHistoryService} from '../../../services/draft-history.service';
import {IProfileData} from '../../../services/profile-header.service';
import {PaginationFooter, PaginationParameters} from '../../components/pagination-footer/pagination-footer.component';
import {DropdownComponent} from '../../components/dropdown/dropdown.component';

@Component({
    selector: 'draft-history',
    templateUrl: './app/fe-core/components/draft-history/draft-history.component.html',
    directives: [ErrorComponent, LoadingComponent, NoDataBox, Tab, Tabs, SliderCarousel, DetailedListItem, PaginationFooter, DropdownComponent]
})

export class DraftHistoryComponent implements OnInit {
  @Input() profileData: IProfileData;

/**
 * 'page' or 'module'
 */
  @Input() type: string;

  private dataArray: Array<DraftHistoryTab>;

  private carouselDataArray: Array<Array<SliderCarouselInput>>;

  private isError: boolean = false;

  private currentIndex: number = 0;

  private sortOptions: Array<any> = [{key: '1', value: 'ascending'}, {key: '2', value: 'descending'}];

  constructor(private _draftService:DraftHistoryService) {
  }

  ngOnInit() {
    if ( this.profileData != null ) {
      this.dataArray = this._draftService.getDraftHistoryTabs(this.profileData);
      if ( this.dataArray && this.dataArray.length > 0 ) {
        this.getDraftPage(this.dataArray[0], "descending");
      }
    }
  }

  getDraftPage(tab: DraftHistoryTab, sortBy) {
    if ( tab.isLoaded ) {
      if ( tab.paginationDetails ) {
        tab.paginationDetails.index = this.currentIndex + 1;
      }
      this.carouselDataArray = tab.carouselDataArray;
    }
    this._draftService.getDraftHistoryService(this.profileData, tab, this.currentIndex, this.type, sortBy)
        .subscribe(
            draftData => {
              tab.isLoaded = true;
              tab.detailedDataArray = draftData.detailedDataArray;
              tab.carouselDataArray = draftData.carouselDataArray;
              tab.paginationDetails = draftData.paginationDetails;
              this.carouselDataArray = tab.carouselDataArray;
            },
            err => {
              tab.isLoaded = true;
              this.isError = true;
              console.log('Error: draftData API: ', err);
            }
        );
  }

  selectedTab(tabTitle) {
    let tabs = this.dataArray.filter(tab => tab.tabTitle == tabTitle);
    if ( tabs.length > 0 ) {
      this.currentIndex = 0; // change page back to beginning
      this.getDraftPage(tabs[0], "descending");
    }
  }

  newIndex(index) {
    window.scrollTo(0,0);
    this.currentIndex = index - 1; //page index is 1-based, but we need 0-based to select correct array
  }
  dropdownChanged($event) {
    this.getDraftPage(this.dataArray[0], event.target.innerText);
  }
}
