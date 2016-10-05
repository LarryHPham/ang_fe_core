
import {Component} from "@angular/core";
import {FormGroup} from "@angular/forms";
@Component({
    selector:"article-search-bar",
    templateUrl:"./app/fe-core/components/search-bar-article/search-bar-article.component.html"
})
export class ArticleSearchBar{
    searchBoxBackground: string = '/app/public/header_texture.png';
    public searchInput:FormGroup;
    public isSubmitted:boolean;
    controlType='textbpx'

}