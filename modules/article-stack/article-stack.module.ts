import {Component,OnInit,Input} from '@angular/core';
import {RectangleImageData} from '../../fe-core/components/images/image-data';
import {RectangleImage} from '../../fe-core/components/images/rectangle-image';
import {StackRowsComponent,StackRowsInput} from '../../fe-core/components/stack-rows/stack-rows.component';
import {ArticleStacktopComponent,StackTopInput} from '../../fe-core/components/article-stacktop/article-stacktop.component';

@Component({
  selector: 'article-stack-module',
  templateUrl: './app/fe-core/modules/article-stack/article-stack.module.html',
  directives: [RectangleImage,StackRowsComponent,ArticleStacktopComponent]
})

export class ArticleStackModule implements OnInit {
  @Input() stackTop: StackTopInput;
  @Input() stackRow: Array<StackRowsInput>;

  ngOnInit() {}
}
