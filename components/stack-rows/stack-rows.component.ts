import {Component,OnInit,Input} from '@angular/core';
import { ArticleStackData } from "../../interfaces/deep-dive.data";

@Component({
  selector: 'stack-rows-component',
  templateUrl: './app/fe-core/components/stack-rows/stack-rows.component.html',
})

export class StackRowsComponent implements OnInit {
  @Input() stackRowData: Array<ArticleStackData>;
  public width: number;
  public gridStackCol: string;

  ngOnInit() {}//ngOnInit ends
}
