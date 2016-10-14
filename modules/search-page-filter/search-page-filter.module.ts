import {Component} from "@angular/core";
@Component({
    selector:"search-filter",
    templateUrl:'./app/fe-core/modules/search-page-filter/search-page-filter.module.html'
})
export class SearchPageFilter{
    icon="caret-down";
keywords=[
    {
        key:"All",
        value:"All Keywords",
    },
    {
        key:"Automative",
        value:"Automative",
    },
    {
        key:"Business",
        value:"Business",
    },
    {
        key:'Sports',
        value:"Sports",
    },
    {
        key:'Politics',
        value:"Politics",
    },
    {
        key:'Entertainment',
        value:"Entertainment",
    },
    {
        key:'Food',
        value:"Food",
    },
    {
        key:'Lifestyle',
        value:"Lifestyle",
    }];

    Sorting=[

        {
            key:"Date-MostRecent",
            value:"Most Recent",
        },
        {
            key:'Date-Oldest',
            value:"Oldest",
        },
        {
            key:'24Hours',
            value:"Last 24 Hours",
        },
        {
            key:'pastWeek',
            value:"Past Week",
        },
        {
            key:'pastWeek',
            value:"Past Week",
        }];
    keywordClick(e){
        //console.log(e);
    }
    sortingClick(e){
        //console.log(e);
    }
}
