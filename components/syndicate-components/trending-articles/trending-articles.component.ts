import {Component, Input} from '@angular/core';


declare var moment;
declare var jQuery: any;

@Component({
    selector: 'syndicated-trending-component',
    templateUrl: './app/fe-core/components/syndicate-components/trending-articles/trending-articles.component.html',


})

export class SyndicatedTrendingComponent {
    trending:boolean = true;
    public widgetPlace: string = "widgetForPage";
    public imageData: any;
    public articleData: any;
    public trendingLength: number = 2;
    @Input() geoLocation: string;
    @Input() currentArticleId: any;
    @Input() scope;
    @Input() trendingData:any;


    constructor(

    ){}



    ngOnInit(){

    }
    private onScroll(event) {
        if (jQuery(document).height() - window.innerHeight - jQuery("footer").height() <= jQuery(window).scrollTop() && this.trendingLength <= 20) {
            jQuery('#loadingArticles').show();

            jQuery('#loadingArticles').hide();
        }
    }
    formatDate(date) {
        //moment(date, "YYYY-MM-Do").format("MM DD, YYYY at HH:MM A");
        return moment(date).format("MMMM DD, YYYY | h:mm A")

    }
}

