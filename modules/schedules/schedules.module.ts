import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {ModuleFooter} from '../../components/module-footer/module-footer.component';
import {ModuleHeader, ModuleHeaderData} from '../../components/module-header/module-header.component';
import {SchedulesComponent} from '../../components/schedules/schedules.component';
import {RouteParams} from '@angular/router-deprecated';
import {GlobalFunctions} from '../../../global/global-functions';

@Component({
    selector: 'schedules',
    templateUrl: './app/fe-core/modules/schedules/schedules.module.html',
    directives: [SchedulesComponent, ModuleHeader, ModuleFooter],
    providers: [],
    inputs:['']
})

export class SchedulesModule implements OnInit{
    @Input() data;
    @Input() profHeader;
    @Input() error;
    @Input() filter1;
    @Input() filter2;
    @Output("tabSelected") tabSelectedListener = new EventEmitter();
    @Output() selectedKeyFilter = new EventEmitter();
    footerData:any;
    tabData: any;
    constructor(private params: RouteParams){

    }
    modHeadData: ModuleHeaderData;

    ngOnInit(){
        this.modHeadData = {
          moduleTitle: "Weekly Schedules - " + this.profHeader.profileName,
          hasIcon: false,
          iconClass: '',
        }
        if(typeof this.params.get('teamId') != 'undefined' && this.params.get('teamId') !== null){
            this.footerData = {
                infoDesc: 'Want to see the full season schedule?',
                text: 'VIEW SCHEDULE',
                url: ['Schedules-page-team',{teamName:GlobalFunctions.toLowerKebab(this.profHeader.profileName), year:2015, teamId:this.params.get('teamId'), pageNum:1}]
            };
        }else{
            this.footerData = {
                infoDesc: 'Want to see the full season schedule?',
                text: 'VIEW SCHEDULE',
                url: ['Schedules-page-league', {year:2015,pageNum:1}]
            };
        }
    }

    ngOnChanges(){
      console.log(this.data);
        if(typeof this.data != 'undefined'){
            if(typeof this.tabData == 'undefined'){
                this.tabData = this.data.tabs;
            }
        }
    }

    filterSelected(event){
      this.selectedKeyFilter.next(event);
    }

    tabSelected(tab) {
        this.tabSelectedListener.next(tab);
    }
}
