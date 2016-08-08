import {Component,OnInit,Input} from '@angular/core';
import {RectangleImage} from '../../fe-core/components/images/rectangle-image';
import {ImageData, RectangleImageData} from '../../fe-core/components/images/image-data';
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {SanitizeHtml} from "../../fe-core/pipes/safe.pipe";


export interface BoxArticleData {
  keyword: string;
  date: string;
  teaser: string;
  url: any;
  imageConfig: RectangleImageData;
}

@Component({
  selector: 'box-article-component',
  templateUrl: './app/fe-core/components/box-article/box-article.component.html',
  directives: [RectangleImage, ROUTER_DIRECTIVES],
  pipes: [SanitizeHtml]
})

export class BoxArticleComponent implements OnInit {
  @Input() boxArticleData: Array<BoxArticleData>;
  ngOnInit() {
  }//ngOnInit ends
}
