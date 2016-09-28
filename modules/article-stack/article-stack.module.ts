import { Component,OnInit,Input } from '@angular/core';
import { ArticleStackData } from "../../interfaces/deep-dive.data";

@Component({
  selector: 'article-stack-module',
  templateUrl: './app/fe-core/modules/article-stack/article-stack.module.html',
})

export class ArticleStackModule implements OnInit {
  @Input() stackTop: ArticleStackData;
  @Input() stackRow: Array<ArticleStackData>;

  ngOnInit() {}
}
