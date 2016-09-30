import {Component, Input, ElementRef} from '@angular/core';
import { Larousel } from '../larousel/larousel';

declare var moment:any;

@Component({
    selector: 'news-box',
    templateUrl: './app/fe-core/components/news-box/news-box.html',
    outputs: ['carouselCount'],
})

export class NewsBox{
  @Input() videoData: any;
  @Input() carData: any;
  private displayedItems: any;

  constructor(private _elRef: ElementRef){

  }

  displayArray(event){
    if(event != null){
      this.displayedItems = event;
    }
  }

  lineClamp(event){
    let getClass = this._elRef.nativeElement.getElementsByClassName('newsbox-item-container-right-content');

    for(var i = 0; i < getClass.length;i++){
      let curClass = getClass[i];
      console.log(curClass);
      let fontSize = curClass.style['font-size'];
      console.log(fontSize);
      var heightLarge = curClass.offsetTop;
      console.log(1,heightLarge);

      // console.log(curClass.offsetTop, this._elRef.nativeElement.getElementsByClassName('newsbox-item-container-right-fullstory')[0].offsetTop);
      //
      // //get vertical distance dynamically between the top of the image and the main horizontal rule.
      // heightLarge = (Math.abs(curClass.offsetTop - this._elRef.nativeElement.getElementsByClassName('newsbox-item-container-right-fullstory')[0].offsetTop));
      // console.log(2,heightLarge);
      // //set max-height for text container.
      // console.log(curClass.style);
      // curClass.style['max-height'] = heightLarge + 'px';
      // //Dynamically parse the number of lines by dividing the max-height of the container by the line height.
      // var topLarge = curClass,
      // lineHeight = parseInt(window.getComputedStyle(topLarge).getPropertyValue("line-height"));
      // var linesLargeTop = Math.floor(heightLarge / lineHeight);
      // console.log(topLarge);
      // console.log(linesLargeTop);
      // //set the line clamp with the line number equation.
      // topLarge.style['-webkit-line-clamp'] = linesLargeTop;

    }
  }

 formatDate(date) {
   return moment(date, "YYYY-MM-Do, h:mm:ss").format("MMMM Do, YYYY h:mm:ss a");
 }
}
