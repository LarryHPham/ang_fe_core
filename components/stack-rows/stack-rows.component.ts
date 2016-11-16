import {Component,OnInit,Input} from '@angular/core';
import {ImageData, RectangleImageData} from '../../components/images/image-data';

export interface StackRowsInput {
  stackRowsRoute: any;
  keyword: string;
  description: string;
  publishedDate: string;
  imageConfig: RectangleImageData;
}

@Component({
  selector: 'stack-rows-component',
  templateUrl: './app/fe-core/components/stack-rows/stack-rows.component.html'
})

export class StackRowsComponent implements OnInit {
  @Input() stackRow: Array<StackRowsInput>;
  public width: number;
  public gridStackCol: string;

  ngOnInit() {}//ngOnInit ends
}
