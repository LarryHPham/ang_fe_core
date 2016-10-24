import {Component, Input,OnInit} from '@angular/core';

declare var moment;
@Component({
    selector: 'recommendations-component',
    templateUrl: './app/fe-core/components/recommendations/recommendations.component.html',
})

export class RecommendationsComponent{
    @Input() randomHeadlines:any;
    @Input() images:any;
    @Input() isDeepDive:boolean = false;
    @Input() hasKeyword:boolean;

    formatDate(date) {
        //moment(date, "YYYY-MM-Do").format("MM DD, YYYY at HH:MM A");
        return moment(date).format("dddd MMMM, YYYY | h:mm A")

    }
    ngOnInit(){}

}
