import {Component, OnInit, Input, OnChanges} from '@angular/core';
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

export class DirectoryPagination implements OnChanges {
  @Input() data: PagingData;
  @Input() nextLink: Link;
  @Input() prevLink: Link;
  @Input() fastFowardLink: Link;
  @Input() reverseLink: Link;
  @Input() dirRangeTotal: boolean;
  @Input() dirPagination: boolean;
  public enablePrev: boolean;
  public enableNext: boolean;
  public enableFwd: boolean;
  public enableRevr: boolean;

  constructor() {
    this.pagesUpdated();
  }

  ngOnChanges() {
    this.pagesUpdated();
  }

  pagesUpdated() {
    if ( this.data !== undefined && this.data !== null ) {
      this.enableNext = this.data.currentPage + 1 <= this.data.totalPages;
      this.enablePrev = this.data.currentPage -1 > 0;
      this.enableFwd = this.data.currentPage + 5 <= this.data.totalPages;
      this.enableRevr = this.data.currentPage - 5 > 0;
    }
    else {
      this.enableNext = false;
      this.enablePrev = false;
      this.enableFwd = false;
      this.enableRevr = false;
    }
  }
}
