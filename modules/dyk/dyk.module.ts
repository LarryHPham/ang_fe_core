import { Component, OnChanges, Input } from '@angular/core';
import { ModuleHeaderData } from '../../components/module-header/module-header.component';

export interface dykModuleData{
  info: string;
}
@Component({
    selector: 'dyk-module',
    templateUrl: './dyk.module.html'
})

export class DYKModule implements OnChanges {
  @Input() profileName: string;
  @Input() dykData: Array<dykModuleData>;

  public headerInfo: ModuleHeaderData = {
    moduleTitle: "Did You Know - [Profile Name]",
    hasIcon: false,
    iconClass: ""
  };

  ngOnChanges(event) {
    let profileName = this.profileName ? this.profileName : "MLB";
    this.headerInfo.moduleTitle = "Did You Know <span class='mod-info'>- " + profileName + "</span>";
  }//ngOnChanges ends
}
