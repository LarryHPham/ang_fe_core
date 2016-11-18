import {Component, Input, OnInit } from "@angular/core";
import {Gradient} from '../../../../global/global-gradient';

@Component({
    selector: 'article-schedule-component',
    templateUrl: './app/fe-core/components/articles/article-schedule/article-schedule.component.html',
    inputs: ['articleData', 'league', 'homeData', 'awayData']
})

export class ArticleScheduleComponent implements OnInit {
    @Input() homeData:any;
    @Input() awayData:any;
    homeHex:string;
    awayHex:string;
    gradient:Object;
    defaultGradient:string;
    public league:boolean;

    ngOnInit() {
    }

    ngOnChanges() {
        if (typeof this.homeData != 'undefined' && typeof this.awayData != 'undefined') {
            this.awayHex = this.awayData[0].awayHex;
            this.homeHex = this.homeData[0].homeHex;
            var fullGradient = Gradient.getGradientStyles([this.awayHex, this.homeHex], .75);
            if (fullGradient) {
                this.gradient = fullGradient;
            }
            else {
                this.defaultGradient = 'default-gradient';
            }
            // this.getGradient(this.homeHex, this.awayHex);
        }
    }
}
