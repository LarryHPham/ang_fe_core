import {Component, Input, OnInit}  from "@angular/core";
import {Router, ROUTER_DIRECTIVES, RouteParams} from '@angular/router-deprecated';
import {ModuleHeader, ModuleHeaderData} from "../../components/module-header/module-header.component";
import {ModuleFooter} from '../../components/module-footer/module-footer.component';
import {GlobalFunctions} from '../../../global/global-functions';

@Component({
    selector: 'fantasy-module',
    templateUrl: './app/fe-core/modules/fantasy/fantasy.module.html',
    directives: [ROUTER_DIRECTIVES, ModuleHeader, ModuleFooter],
    inputs: []
})

export class FantasyModule implements OnInit{
    @Input() profHeader;
    isSmall:boolean = false;
    teamID:string;
    modHeadData: ModuleHeaderData;
    footerData:any;

    constructor(private _params:RouteParams) {
        this.teamID = _params.get('teamId');
    }

    onResize(event) {
        this.isSmall = event.target.innerWidth <= 639;
    }

    ngOnInit() {
        this.isSmall = window.innerWidth <= 639;
        this.modHeadData = {
            moduleTitle: "Fantasy Report - " + this.profHeader.profileName,
            hasIcon: false,
            iconClass: '',
        };
        this.footerData = {
            infoDesc: 'Want to see more of the Fantasy Module?',
            text: 'VIEW FANTASY REPORT',
            url: ['Error-page']
        };
    }
}