import { Component, OnChanges, Output, Input, EventEmitter, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'box-scores',
  templateUrl: './app/fe-core/modules/box-scores/box-scores.module.html',
  outputs: ['dateEmit']
})

export class BoxScoresModule implements OnInit {
  @Input() boxScores:any;
  @Input() calendarParams:any;

  // private moduleHeight: string;
  public dateEmit = new EventEmitter();
  public liveArray = new EventEmitter();
  public heightStyle: string;
  private gameNum:number = 0;
  public currentPage:number = 1;
  public windowWidth: number = 10;
  public rightDisabled = "";
  public leftDisabled = "disabled";

  constructor() {}

  ngOnInit() {}

  dateTransfer(event){
    //console.log('6. box-scores-module - dateTransfer - event - ',event);
    this.dateEmit.next(event);
    this.currentPage = 1;
    this.leftDisabled = "disabled";
    this.rightDisabled = "";
  }
}
