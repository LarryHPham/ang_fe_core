import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//interfaces
import { ModuleHeader, ModuleHeaderData } from '../../components/module-header/module-header.component';

@Component({
    selector: 'schedules',
    templateUrl: './schedules.module.html'
})

export class SchedulesModule{
    @Output("tabSelected") tabSelectedListener = new EventEmitter();
    @Output() selectedKeyFilter = new EventEmitter();

    @Input() profHeader;
    @Input() tabs;
    @Input() selectedTabDisplay:string;
    @Input() filter1;
    @Input() filter2;
    @Input() dropdownKey1: string;
    @Input() dropdownKey2: string;
    @Input() schedulesModuleFooterUrl: any;
    @Input() error;

    public teamID: string;
    footerData:any;
    tabData: any;
    tabDisplay:any ;
    partnerIdParam: string;
    modHeadData: ModuleHeaderData;

    constructor(
      private _router:Router,
      private activateRoute: ActivatedRoute
    ){}



    moduleDisplay(tabDisplay?){
        this.modHeadData = {
            moduleTitle: "Weekly Schedules <span class='mod-info'>- " + this.profHeader.profileName + "</span>",
            hasIcon: false,
            iconClass: '',
        };
        this.footerData = {
            infoDesc: 'Want to see the full season schedule?',
            text: 'VIEW SCHEDULE',
            url: this.schedulesModuleFooterUrl
        }
    } //moduleDisplay



    ngOnChanges(event) {
        this.moduleDisplay(this.selectedTabDisplay);
    } //ngOnChanges



    filterSelected(event){
      this.selectedKeyFilter.next(event);
    } //filterSelected



    tabSelected(tab) {
        this.tabSelectedListener.next(tab);
    } //tabSelected
}
