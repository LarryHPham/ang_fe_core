
import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";
@Component({
    selector:"article-search-bar",
    templateUrl:"./app/fe-core/components/search-bar-article/search-bar-article.component.html"
})
export class ArticleSearchBar{
    @Input() searchTitle:string;
    @Input() searchSubTitle:string;
    @Input() subCategoryList:Array<any>;
    @Input() isSearchModule;
    searchBoxBackground: string = 'http://www.wallpapersxl.com/wallpapers/1366x768/dark-green/149216/dark-green-free-hd-leaves-field-windows-149216.jpg';
    public searchInput:FormGroup;
    public isSubmitted:boolean;
    /*controlType='textbpx'*/



}