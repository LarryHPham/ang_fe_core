import {Component, Input} from '@angular/core';

@Component({
    selector: 'article-sub-component',
    templateUrl: './app/fe-core/components/articles/sub-article/sub-article.component.html',
    inputs: ['randomArticles', 'league', 'teamID']
})

export class ArticleSubComponent {
}
