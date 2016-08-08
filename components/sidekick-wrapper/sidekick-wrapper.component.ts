import {Component, Input, OnInit} from '@angular/core';
import {WidgetModule} from "../../fe-core/modules/widget/widget.module";

@Component({
    selector: 'sidekick-wrapper',
    templateUrl: './app/fe-core/components/sidekick-wrapper/sidekick-wrapper.component.html',
    directives:[WidgetModule],
    providers: []
})

export class SidekickWrapper {}
