import {Component,Input} from "@angular/core";
@Component({
    selector:'search-results',
    templateUrl:'./app/fe-core/modules/search-article-results/search-article-results.module.html'
})
export class SearchArticleResults{
    @Input() searchArticlesData:Array<any>;

}
