import { Component, Input } from '@angular/core';
import { ArticleStackData } from "../../interfaces/deep-dive.data";

@Component({
  selector: 'article-stack-2-module',
  templateUrl: './app/fe-core/modules/article-stack-style-2/article-stack.module.html',
})

export class ArticleStack2Module {
  @Input() articleStack2Data: Array<ArticleStackData>;
}
