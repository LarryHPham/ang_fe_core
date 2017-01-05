import {Component, Input} from '@angular/core';

@Component({
    selector: 'sidekick-wrapper-ai',
    templateUrl: './sidekick-wrapper-ai.component.html',

})

export class SidekickWrapperAI {
    @Input() aiSidekick;
    @Input() scope;
}
