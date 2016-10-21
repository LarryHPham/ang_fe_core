import { Component, OnChanges, Output, Input, EventEmitter, ElementRef, OnInit } from '@angular/core';
import {ScrollerFunctions} from '../../../global/scroller-functions';

@Component({
  selector: 'box-scores',
  templateUrl: './app/fe-core/modules/box-scores/box-scores.module.html',
  outputs: ['dateEmit']
})

export class BoxScoresModule implements OnInit {
  @Input() boxScores:any;
  @Input() calendarParams:any;
  @Input() scroll:boolean;
  @Input() maxHeight:any;

  // private moduleHeight: string;
  public dateEmit = new EventEmitter();
  public liveArray = new EventEmitter();
  public heightStyle: string;
  private gameNum:number = 0;
  public currentPage:number = 1;
  public windowWidth: number = 10;
  public rightDisabled = "";
  public leftDisabled = "disabled";
  private refreshBoxScores = "";

  constructor(
    private _elementRef:ElementRef,
    private _scroller:ScrollerFunctions
  ){}

  ngOnInit(){
    this.windowWidth = window.innerWidth;
    if(this.scroll){
      if(this.boxScores != null){
        if (this.currentPage == this.boxScores.gameInfo.length) {
          this.rightDisabled = "disabled";
        }
        let gameinfoHeight = this.boxScores.gameInfo.length < 3 ? (this.boxScores.gameInfo.length * 280): 650;
        this.maxHeight = gameinfoHeight;
      }else{
        this.maxHeight = 650;
      }
    }
    this.checkHeight();
  }

  ngOnChanges(event){
    console.log(event);
    if(event.calendarParams != null){
      this.boxScores = null;
      this.calendarParams = event.calendarParams.currentValue;
    }
    if(this.boxScores != null){
      if (this.currentPage == this.boxScores.gameInfo.length) {
        this.rightDisabled = "disabled";
      }
    }
    if(this.scroll){
      if(this.boxScores != null){
        if (this.currentPage == this.boxScores.gameInfo.length) {
          this.rightDisabled = "disabled";
        }
        let gameinfoHeight = this.boxScores.gameInfo.length < 3 ? (this.boxScores.gameInfo.length * 280): 650;
        this.maxHeight = gameinfoHeight;
      }else{
        this.maxHeight = 650;
      }
    }
    this.checkHeight();
  }

  checkHeight(){
    if(document.getElementById('box-header') != null && this.scroll && this.maxHeight != null && this.boxScores != null){
      var boxHeader = document.getElementById('box-header').offsetHeight;
      //only for mlb page but subtract the mod title and calendar height from what was sent in
      if(this.maxHeight != 'auto'){
        this.maxHeight -= boxHeader;
        this.heightStyle = this.maxHeight + "px";
      }else{
        this.scroll = false;
        this.heightStyle = 'auto';
      }
    }
    if(this.refreshBoxScores.length > 10){
      this.refreshBoxScores = "";
    }else{
      this.refreshBoxScores += " ";
    }
    ScrollerFunctions.initializeScroller(this._elementRef.nativeElement, document);
  }

  private onWindowLoadOrResize(event) {
    this.windowWidth = event.target.innerWidth;
  }

  dateTransfer(event){
    this.dateEmit.next(event);
    this.currentPage = 1;
    this.leftDisabled = "disabled";
    this.rightDisabled = "";
  }

  changeGame(num){
    this.gameNum = num;
  }

  // Functions to scan through games on the same day for mobile
  advancePage(){
    if (this.currentPage != this.boxScores.gameInfo.length) {
      this.currentPage = this.currentPage + 1;
      this.leftDisabled = "";
      if (this.currentPage != this.boxScores.gameInfo.length) {
        this.rightDisabled = "";
      }
      else {
        this.rightDisabled = "disabled";
      }
    }
  }
  retreatPage(){
    if (this.currentPage != 1) {
      this.currentPage = this.currentPage - 1;
      this.rightDisabled = "";
      if (this.currentPage != 1) {
        this.leftDisabled = "";
      }
      else {
        this.leftDisabled = "disabled";
      }
    }
  }
}
