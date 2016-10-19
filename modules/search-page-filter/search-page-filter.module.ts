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
        key:'Celebreties',
        value:"Celebreties",
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
        key:'Health',
        value:"Health",
    },
    {
        key:'Lifestyle',
        value:"Lifestyle",
    },
    {
        key:'MLB',
        value:"MLB",
    },
    {
        key:'Movies',
        value:"Movies",
    },
    {
        key:'Music',
        value:"Music",
    },
    {
        key:'NBA',
        value:"NBA",
    },
    {
        key:'NCAAF',
        value:"NCAAF",
    },
    {
        key:'NCAAM',
        value:"NCAAM",
    },
    {
        key:'NFL',
        value:"NFL",
    },
    {
        key:'Politics',
        value:"Politics",
    },
    {
        key:'Real Estate',
        value:"Real Estate",
    },
    {
        key:'Sports',
        value:"Sports",
    },
    {
        key:'Travel',
        value:"Travel",
    },
    {
        key:'Trending',
        value:"Trending",
    },
    {
        key:'TV Shows',
        value:"TV Shows",
    },
    {
        key:'Weather',
        value:"Weather",
    }];

    Sorting=[
        {
            key:'None',
            value:"None",
        },

        {
            key:"Date-MostRecent",
            value:"Date - MostRecent",
        },
        {
            key:'Date-Oldest',
            value:"Date - Oldest",
        },
        {
            key:'last24Hours',
            value:"Last 24 Hours",
        },
        {
            key:'pastWeek',
            value:"Past Week",
        },
        ];
    keywordClick(e){
        //console.log(e);
    }
    sortingClick(e){
        //console.log(e);
    }
}
