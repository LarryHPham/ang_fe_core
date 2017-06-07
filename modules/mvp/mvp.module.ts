import {Component, OnChanges, Output, Injectable, EventEmitter, Input} from '@angular/core';

//interfaces
import { ModuleFooterData } from '../../components/module-footer/module-footer.component';
import { ModuleHeaderData } from '../../components/module-header/module-header.component';
import { MVPTabData } from '../../components/mvp-list/mvp-list.component';



@Component({
  selector: 'mvp-module',
  templateUrl: './mvp.module.html'
})

export class MVPModule implements OnChanges {
  @Output() tabSelectedListener = new EventEmitter();
  @Output() dropdownPositionSelection = new EventEmitter();

  @Input() scope: string;
  @Input() tabs: any;
  @Input() mvpData: Array<MVPTabData>;
  @Input() sortOptions: any;
  @Input() selectedTabTitle: string;
  @Input() selectedFilterTitle: string;
  @Input() isError: boolean;
  @Input() mvpModuleFooterParams: Array<any>;

  modHeadData: ModuleHeaderData;
  footerData: ModuleFooterData;

  ngOnChanges(event) {
      this.displayData();
  }



  tabSelected(tab) {
      this.tabSelectedListener.emit(tab);
  }



  dropdownChanged($event) {
    this.dropdownPositionSelection.emit($event);
  }



  displayData() {
    this.modHeadData = {
        moduleTitle: "Most Valuable Players",
        moduleIdentifier: " - "+this.scope.toUpperCase() + " " + this.selectedFilterTitle,
        hasIcon: false,
        iconClass: '',
    };
    this.footerData = {
      infoDesc: 'Want to see everybody involved in this list?',
      text: 'VIEW THE LIST',
      url: this.mvpModuleFooterParams
    };
  }
}
