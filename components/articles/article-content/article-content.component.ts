import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'article-content-component',
    templateUrl: './app/fe-core/components/articles/article-content/article-content.component.html',
    inputs: ["articleData", "articleType", "articleSubType", "imageLinks", "teamId", "partnerId", "scope"],
})

export class ArticleContentComponent implements OnInit{
    isSmall:boolean = false;

    onResize(event) {
        this.isSmall = event.target.innerWidth < 640;
    }

    ngOnInit() {
        this.isSmall = window.innerWidth < 640;
    }
}
