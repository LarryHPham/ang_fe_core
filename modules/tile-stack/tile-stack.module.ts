import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tile-stack-module',
  templateUrl: './tile-stack.module.html'
})

export class TileStackModule{
  @Input() tilestackData: any;
  ngOnInit() {}
}
