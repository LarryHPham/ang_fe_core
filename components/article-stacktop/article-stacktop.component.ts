import { Component, Input } from '@angular/core';
import { ArticleStackData } from "../../interfaces/deep-dive.data";

@Component({
  selector: 'article-stacktop-component',
  templateUrl: './article-stacktop.component.html',
})

export class ArticleStacktopComponent{
  @Input() stackTopData: Array<ArticleStackData>;
}
