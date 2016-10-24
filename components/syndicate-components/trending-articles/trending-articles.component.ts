import {Component, Input} from '@angular/core';
import {SyndicateArticleService} from "../../../../services/syndicate-article.service";


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
    @Input() category;
    @Input() subCategory;
//http://dev-tcxmedia-api.synapsys.us/articles?source=tca&count=10&category=entertainment&subCategory=television

    constructor(private _synService:SyndicateArticleService){}

    private getDeepDiveArticle() {
        //var startNum=Math.floor((Math.random() * 29) + 1);
         this._synService.getTrendingArticles(this.category,this.subCategory,20).subscribe(
         data => {
         this.articleData = this._synService.transformTrending(data.data);
         if (this.trendingLength <= 20) {

         this.trendingLength = this.trendingLength + 10;
         }
         }

         )
       /* this._synService.getDeepDiveBatchService(scope, numItems, startNum, state).subscribe(
            data => {
                this.articleData = this._synService.transformTrending(data.data, currentArticleId);

                
                if (this.trendingLength <= 20) {

                    this.trendingLength = this.trendingLength + 10;
                }
            }

        )*/


    }

    ngOnInit(){
        this.getDeepDiveArticle();




    }
    ngDoCheck(){
        //this.getDeepDiveArticle(this.scope, 10 , this.geoLocation, this.currentArticleId);

    }
    private onScroll(event) {
        if (jQuery(document).height() - window.innerHeight - jQuery("footer").height() <= jQuery(window).scrollTop() && this.trendingLength <= 20) {
            jQuery('#loadingArticles').show();

            jQuery('#loadingArticles').hide();
        }
    }
    formatDate(date) {

        return moment(date).format("MMMM DD, YYYY | h:mm A")

    }
}

