
import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute} from '@angular/router';
@Component({
    selector:'syndicate-article',
    templateUrl:'./app/fe-core/components/syndicate-components/syndicate-article/main-article.component.html',
})
export class MainArticle implements OnInit{
    @Input() title:string;
    @Input() author:string;
    @Input() publisher:string;
    @Input() articleDate:string;
    @Input() teaser:string;
    @Input() imageData;
    ngOnInit(){
    
    }
    constructor(private activatedRoute: ActivatedRoute){
    }
}
