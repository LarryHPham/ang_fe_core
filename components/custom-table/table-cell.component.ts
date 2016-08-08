import {Component, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {TableColumn, CellData} from '../../fe-core/components/custom-table/table-data.component';
import {CircleImage} from '../../fe-core/components/images/circle-image';

@Component({
  selector: 'table-cell',
  templateUrl: './app/fe-core/components/custom-table/table-cell.component.html',
  directives: [CircleImage, ROUTER_DIRECTIVES]
})

export class TableCell {  
  @Input() cell: CellData;
  
  @Input() index: string;
}