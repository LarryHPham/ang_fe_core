import {Component, Input, OnInit, OnChanges, Output, EventEmitter, ElementRef, Renderer} from '@angular/core';
//import {Search, SearchInput} from '../../components/search/search.component';
//import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
//import {GlobalSettings} from "../../../global/global-settings";
//import {HamburgerMenuComponent, MenuData} from '../../components/hamburger-menu/hamburger-menu.component';
declare var stButtons: any;
declare var jQuery:any;

@Component({
    selector: 'header-component',
    templateUrl: './app/fe-core/components/header/header.component.html',
   // directives: [Search, ROUTER_DIRECTIVES, HamburgerMenuComponent],
    //providers: [],
})
export class HeaderComponent {
@Input() title:string;
}
