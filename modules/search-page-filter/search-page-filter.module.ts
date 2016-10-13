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
    }];

    Sorting=[
        {
            key:"none",
            value:"none",
        },
        {
            key:"MostRecent",
            value:"Most Recent",
        },
        {
            key:'Oldest',
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
