import { Component, OnInit, Input } from '@angular/core';
export interface infoData {
  title: string;
  lastUpdated: string;
  paragraph: Array<subInfoData>;
}
export interface subInfoData {
  subHeader: string;
  info: Array<string>;
}
@Component({
  selector: 'information-component',
  templateUrl: './app/fe-core/components/page-information/page-information.component.html',
})

export class InfoComponent implements OnInit{
  @Input() infoData: infoData;
  ngOnInit(){

  }
}
