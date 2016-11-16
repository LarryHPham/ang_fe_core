import {Component, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {TableColumn, CellData} from '../../components/custom-table/table-data.component';
import {CircleImage} from '../../components/images/circle-image';
import {SanitizeHtml} from '../../pipes/safe.pipe';

@Component({
  selector: 'table-cell',
  templateUrl: './app/fe-core/components/custom-table/table-cell.component.html',
  directives: [CircleImage, ROUTER_DIRECTIVES],
  pipes:[SanitizeHtml]
})

export class TableCell {
  @Input() data: any;

  @Input() index: string;
  cellLocal: CellData;
  ngOnChanges(event) {
    this.cellLocal = this.data.model.getCellData(this.data.item, this.data.hdr);
  }
}
