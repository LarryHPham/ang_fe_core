import {Component, Input} from '@angular/core';

@Component({
    selector: 'article-sub-component',
    templateUrl: './sub-article.component.html'
})

export class ArticleSubComponent {
    @Input() league:any;
    @Input() randomArticles:any;
    @Input() teamID:any;
}
