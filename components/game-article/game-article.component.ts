import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'game-article',
    templateUrl: './app/fe-core/components/game-article/game-article.component.html'
})

export class GameArticle implements OnInit{
    @Input() gameArticle:any;
    constructor() {}

    ngOnInit(){}
}
