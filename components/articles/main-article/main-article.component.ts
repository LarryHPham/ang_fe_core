import {Component, Input}  from "@angular/core";

@Component({
    selector: 'article-main-component',
    templateUrl: './app/fe-core/components/articles/main-article/main-article.component.html'
})

export class ArticleMainComponent {
    @Input() eventType:any;
    @Input() keyword:any;
    @Input() mainContent:any;
    @Input() mainEventID:any;
    @Input() mainImage:any;
    @Input() mainTitle:any;
    @Input() timeStamp:any;
    @Input() titleFontSize:any;
}