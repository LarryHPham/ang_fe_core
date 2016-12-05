import { Component, OnChanges, Output, Input, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ScrollerFunctions } from '../../../global/scroller-functions';

@Component({
  selector: 'box-scores',
  templateUrl: './app/fe-core/modules/box-scores/box-scores.module.html',
  outputs: ['dateEmit']
})

export class BoxScoresModule implements OnInit {
  @Input() scope: string;
  @Input() boxScores:any;
  @Input() calendarParams:any;
  @Input() scroll:boolean;
  @Input() maxHeight:any;

  // private moduleHeight: string;
  public dateEmit = new EventEmitter();
  public resetControls = new EventEmitter();
  public liveArray = new EventEmitter();
  public heightStyle: string;
  private gameNum:number = 0;
  public currentPage:number = 1;
  public windowWidth: number = 10;
  public rightDisabled = "";
  public leftDisabled = "disabled";
  private refreshBoxScores = "";
  public lastAvailableGame: boolean;
  public checkForLastGameFirstRun: boolean = true;
  private counter:number = 0;

  constructor(
    private _elementRef:ElementRef,
    private _scroller:ScrollerFunctions
  ){}

  ngOnInit(){
    this.windowWidth = window.innerWidth;
    if (this.scroll) {
      if(this.boxScores != null){
        if (this.currentPage == this.boxScores.gameInfo.length) {
          this.rightDisabled = "disabled";
        }
        let gameinfoHeight = this.boxScores.gameInfo.length < 3 ? (this.boxScores.gameInfo.length * 280): 650;
        this.maxHeight = gameinfoHeight;
        this.checkForLastGame(this.boxScores.nextGameDate.event_date);
      } else {
        this.maxHeight = 650;
      }
    }
    this.checkHeight();
  } //ngOnInit



  ngOnChanges(event){
    console.log('---ngOnChanges---');
    console.log('event - ',event);
    console.log('this.boxScores - ',this.boxScores);

    if(this.boxScores != null){
      if (this.currentPage == this.boxScores.gameInfo.length) {
        this.rightDisabled = "disabled";
      }

      let currentNextGameDate = event.boxScores.currentValue && event.boxScores.currentValue.nextGameDate ? event.boxScores.currentValue.nextGameDate.event_date : '';
      let previousNextGameDate = event.boxScores.previousValue && event.boxScores.previousValue.nextGameDate ? event.boxScores.previousValue.nextGameDate.event_date : '';

      console.log('currentNextGameDate - ',currentNextGameDate);
      console.log('previousNextGameDate - ',previousNextGameDate);

      this.checkForLastGame();
    }
    if (this.scroll) {
      if(this.boxScores != null){
        if (this.currentPage == this.boxScores.gameInfo.length) {
          this.rightDisabled = "disabled";
        }
        let gameinfoHeight = this.boxScores.gameInfo.length < 3 ? (this.boxScores.gameInfo.length * 280): 650;
        this.maxHeight = gameinfoHeight;
      } else {
        this.maxHeight = 650;
      }
    }

    this.checkHeight();
  } //ngOnChanges



  checkForLastGame(value?) {
    console.log('---checkForLastGame---');
    console.log('value - ',value);
    console.log('this.boxScores.nextGameDate.event_date - ',this.boxScores.nextGameDate.event_date);
    if ( value == 'prevGame' ) {
      console.log('this.counter - ',this.counter);
      this.counter --;
      console.log('this.counter - ',this.counter);
    }
    else if ( value == 'nextGame' ) {
      this.counter ++;
    }

    if ( this.counter >= 0 && this.boxScores.nextGameDate.event_date == null ) {
      this.lastAvailableGame = true;
    }
    else {
      this.lastAvailableGame = false;
    }
    console.log('counter - ',this.counter);
    console.log('this.lastAvailableGame - ',this.lastAvailableGame);
  } //checkForLastGame



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

    //wait a brief period for the page to redraw after the new data has come in before checking size of page objects
    setTimeout(() => {
      if(this.refreshBoxScores.length > 10){
        this.refreshBoxScores = "";
      }else{
        this.refreshBoxScores += " ";
      }
    }, 100);

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
