import {Component, Input}  from "@angular/core";

@Component({
    selector: 'article-main-component',
    templateUrl: './app/fe-core/components/articles/main-article/main-article.component.html',
    inputs: ['mainTitle', 'mainContent', 'titleFontSize', 'mainImage', 'eventType', 'mainEventID', 'timeStamp', 'keyword']
})

export class ArticleMainComponent {
}