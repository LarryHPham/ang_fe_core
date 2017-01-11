import {Component, Input}  from "@angular/core";

@Component({
  selector: 'article-main-component',
  templateUrl: './main-article.component.html'
})

export class ArticleMainComponent {
  @Input() mainArticleData:any;
  @Input() timeStamp:any;
}
