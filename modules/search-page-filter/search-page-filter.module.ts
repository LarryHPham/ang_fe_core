import {Component} from "@angular/core";
@Component({
    selector:"search-filter",
    templateUrl:'./app/fe-core/modules/search-page-filter/search-page-filter.module.html'
})
export class SearchPageFilter{
keywords=[{
    key:"Business",
    value:"Business",
},
    {
        key:'Sports',
        value:"Sports",
    }];
    Sorting=[{
        key:"MostRecent",
        value:"Most Recent",
    },
        {
            key:'Older',
            value:"Older",
        }];
    keywordClick(e){
        //console.log(e);
    }
    sortingClick(e){
        //console.log(e);
    }
}
