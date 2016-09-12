import {Component, Input} from '@angular/core';
import {WidgetModule} from "../../modules/widget/widget.module";

@Component({
    selector: 'sidekick-wrapper-ai',
    templateUrl: './app/fe-core/components/sidekick-wrapper-ai/sidekick-wrapper-ai.component.html',
    directives: [WidgetModule],
    inputs: ['aiSidekick', 'syndicated', 'scope']
})

export class SidekickWrapperAI {}
