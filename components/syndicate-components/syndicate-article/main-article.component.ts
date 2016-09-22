
import {Component, Input} from "@angular/core";
@Component({
    selector:'syndicate-article',
    templateUrl:'./app/fe-core/components/syndicate-components/syndicate-article/main-article.component.html',
})
export class MainArticle{
    @Input() title:string;
    @Input() author:string;
    @Input() publisher:string;
    @Input() articleDate:string;
    @Input() teaser:string;
    @Input() imageData;
}
