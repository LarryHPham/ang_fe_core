import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Link} from '../../../global/global-interface';
import {PagingData} from './directory.data';

@Component({
    selector: 'directory-pagination',
    templateUrl: './app/fe-core/modules/directory/directory-pagination.component.html',
    directives: [ROUTER_DIRECTIVES, NgClass],
    providers: []
})

export class DirectoryPagination {
  @Input() data: PagingData;
}
