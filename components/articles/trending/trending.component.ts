import {Component, OnInit} from '@angular/core';
import {Router,ROUTER_DIRECTIVES, RouteParams} from '@angular/router-deprecated';
import {SanitizeHtml} from "../../../pipes/safe.pipe";
import {SidekickContainerComponent} from "../sidekick-container/sidekick-container.component";
import {ShareLinksComponent} from "../shareLinks/shareLinks.component";

@Component({
    selector: 'trending-component',
    templateUrl: './app/fe-core/components/articles/trending/trending.component.html',
    directives: [ShareLinksComponent, ROUTER_DIRECTIVES, SidekickContainerComponent],
    inputs: ['trendingData', 'trendingImages'],
    pipes: [SanitizeHtml],
})

export class TrendingComponent implements OnInit{
    isSmall:boolean = false;

    onResize(event) {
        this.isSmall = event.target.innerWidth <= 639;
    }

    ngOnInit() {
        this.isSmall = window.innerWidth <= 639;
    }
}