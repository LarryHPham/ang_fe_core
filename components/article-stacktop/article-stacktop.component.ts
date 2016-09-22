import {Component,OnInit,Input} from '@angular/core';
import { RectangleImageData } from '../images/image-data';
// import {SanitizeHtml} from "../../pipes/safe.pipe";

export interface StackTopInput{
  // articleStackRoute: any;
  keyword: string;
  date: string;
  headline: string;
  provider1: string;
  provider2: string;
  description: string;
  imageConfig: RectangleImageData;
}

@Component({
  selector: 'article-stacktop-component',
  templateUrl: './app/fe-core/components/article-stacktop/article-stacktop.component.html',
  // pipes: [SanitizeHtml]
})

export class ArticleStacktopComponent implements OnInit{
  @Input() stackTopData: StackTopInput;
  ngOnInit() {
    if (typeof this.stackTopData === undefined || this.stackTopData === null) {
      var sampleImage = "/app/public/placeholder_XL.png";
      this.stackTopData = {
        // articleStackRoute: ['Syndicated-article-page', {articleType: 'story', eventID: 1}],
        // articleStackRoute: ['/syndicated-article'],
        keyword: "[Keyword]",
        date: "[Date]",
        headline: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo",
        provider1: "By [Columnist Name]",
        provider2: "Published By: [Domain.com]",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        imageConfig: {
          imageClass: "embed-responsive-16by9",
          imageUrl: sampleImage,
          /*hoverText: "View Article",*/
        }
      }//this.stackTopData ends
    }
  }//ngOnInit ends
}
