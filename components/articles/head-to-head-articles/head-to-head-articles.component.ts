import {Component, Input}  from "@angular/core";

@Component({
    selector: 'article-head-to-head-component',
    templateUrl: './app/fe-core/components/articles/head-to-head-articles/head-to-head-articles.component.html'
})

export class HeadToHeadComponent {
    @Input() arrLength:any;
    @Input() league:any;
    @Input() randomHeadToHead:any;
}