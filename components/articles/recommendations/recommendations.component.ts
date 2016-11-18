import {Component, Input} from '@angular/core';

@Component({
    selector: 'recommendations-component',
    templateUrl: './app/fe-core/components/articles/recommendations/recommendations.component.html'
})

export class RecommendationsComponent {
    @Input() images:any;
    @Input() randomHeadlines:any;
    @Input() isDeepDive:boolean = false;
}
