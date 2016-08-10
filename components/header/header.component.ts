import {Component, Input, OnInit, OnChanges, Output, EventEmitter, ElementRef, Renderer} from '@angular/core';
import {Search, SearchInput} from '../../components/search/search.component';
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {SubHeaderComponent} from '../../components/sub-header/sub-header.component';
import {GlobalSettings} from "../../../global/global-settings";
import {HamburgerMenuComponent, MenuData} from '../../components/hamburger-menu/hamburger-menu.component';
declare var stButtons: any;
declare var jQuery:any;

@Component({
    selector: 'header-component',
    templateUrl: './app/fe-core/components/header/header.component.html',
    directives: [Search, ROUTER_DIRECTIVES, SubHeaderComponent, HamburgerMenuComponent],
    providers: [],
})
export class HeaderComponent implements OnInit,OnChanges {
  @Input('partner') partnerID:string;
  @Output() tabSelected = new EventEmitter();
  public logoUrl:string;
  private _stickyHeader: string;
  public searchInput: SearchInput = {
       placeholderText: "Search for anything " + GlobalSettings.getSportName(),
       hasSuggestions: true
  };
  public hamburgerMenuData: Array<MenuData>;
  public hamburgerMenuInfo: Array<MenuData>;
  public titleHeader: string;
  public isOpened: boolean = false;
  public isActive: boolean = false;
  public _sportLeagueAbbrv: string = GlobalSettings.getSportLeagueAbbrv();
  public _collegeDivisionAbbrv: string = GlobalSettings.getCollegeDivisionAbbrv();
  private elementRef:any;

  constructor(elementRef: ElementRef, private _renderer: Renderer){
    this.elementRef = elementRef;
  }
  openSearch(event) {
    if(event.target.parentElement.classList.contains('active') || event.target.parentElement.parentElement.classList.contains('active')){
      event.target.parentElement.classList.remove('active');
      event.target.parentElement.parentElement.classList.remove('active');
    }
    else {
      event.target.parentElement.classList.add('active');
      event.target.parentElement.parentElement.classList.add('active');
    }
  }
  // Page is being scrolled
  onScrollStick(event) {
    //check if partner header exist and the sticky header shall stay and not partner header
    if( document.getElementById('partner') != null){
      var partnerHeight = document.getElementById('partner').offsetHeight;
      var scrollTop = jQuery(window).scrollTop();
      let stickyHeader = partnerHeight ? partnerHeight : 0;

      let maxScroll = stickyHeader - scrollTop;

      if(maxScroll <= 0){
        maxScroll = 0;
      }

      this._stickyHeader = (maxScroll) + "px";
    }else{
      this._stickyHeader = "0px"
    }
  }//onScrollStick ends
   public getMenu(event): void{
     if(this.isOpened == true){
       this.isOpened = false;
     }else{
       this.isOpened = true;
     }
   }
  ngOnInit(){
    stButtons.locateElements();
    this._renderer.listenGlobal('document', 'click', (event) => {
      var element = document.elementFromPoint(event.clientX, event.clientY);
      let menuCheck = element.className.indexOf("menucheck");
      if(this.isOpened && menuCheck < 0){
        this.isOpened = false;
      }
    });
  }

  ngOnChanges() {
    this.logoUrl = 'app/public/Touchdown-Loyal_Logo_Outlined-W.svg';
  }
}
