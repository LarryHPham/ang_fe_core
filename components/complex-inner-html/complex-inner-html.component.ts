import {Component, OnInit, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Link} from '../../../global/../global-interface';

@Component({
    selector: 'complex-inner-html',
    templateUrl: './app/fe-core/components/complex-inner-html/complex-inner-html.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [],
})

export class ComplexInnerHtml {
  @Input() textItems: Array<Link | string>;
}
