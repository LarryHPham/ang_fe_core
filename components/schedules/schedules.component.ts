import {Component, Input, Output, OnInit, DoCheck, OnChanges, EventEmitter} from '@angular/core';

//interfaces
import {SchedulesCarousel, SchedulesCarouselInput} from '../carousels/schedules-carousel/schedules-carousel.component';
import {TableModel} from '../custom-table/table-data.component';



export interface TableTabData<T> {
  title: string;
  isActive: boolean;
  sections: Array<TableComponentData<T>>;
}

export interface TableComponentData<T> {
  groupName: string;
  tableData: TableModel<T>;
}
@Component({
    selector: 'schedules-component',
    templateUrl: './schedules.component.html'
})

export class SchedulesComponent implements OnInit{
  public selectedIndex;
  @Output() selectedKeyFilter =  new EventEmitter();
  @Output("tabSelected") tabSelectedListener = new EventEmitter();

  @Input() carouselData: Array<SchedulesCarouselInput> = [];// the data to send through the schedules carousel to display
  @Input() tabs;// the tab data gets inputed through here to display all tabs
  @Input() selectedTabDisplay:string;
  @Input() error;
  @Input() filter1 : Array<{key:string, value:string}>;
  @Input() filter2 : Array<{key:string, value:string}>;
  @Input() dropdownKey1: string;
  @Input() dropdownKey2: string;

  tabTitle: string;
  private tabsLoaded: {[index:number]:string};
  windowWidth: number;



  private onWindowLoadOrResize(event) {
    this.windowWidth = event.target.innerWidth;
  }



  ngOnInit(){ //on view load set default data
    this.windowWidth = 960;
  } //ngOnInit



  ngOnChanges(event) {
      this.updateCarousel();
  }



  tabSelected(event){
    this.tabTitle = event;
    this.tabSelectedListener.emit(event);
  }



  filterSwitch(event){
    this.selectedKeyFilter.next(event);
  }



    updateCarousel(sortedRows?) {// each time a table sort or tab has been changed then update the carousel to fit the newly sorted array
        let carouselData: Array<any> = [];
        let index = 0;
        let selectedIndex = -1;
        var selectedTab = this.tabs.filter(value => value.display == this.selectedTabDisplay)[0];
            selectedTab.tabData.sections.forEach((section,i) => { //when updating carousel run through each table to new sorted style
            section.tableData.rows.map((value) => {//then run through each tables rows
                let item = section.updateCarouselData(value, index);
                    if ( section.tableData.isRowSelected(value, index) ) {
                        selectedIndex = index;
                    }
                index++;
                return item;
            })
            .forEach(value => {
                carouselData.push(value);
            });
        })
        this.selectedIndex = selectedIndex < 0 ? 0 : selectedIndex;
        this.carouselData = carouselData;
    } //updateCarousel
}
