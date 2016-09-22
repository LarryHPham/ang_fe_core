import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'box-scores',
  templateUrl: './app/fe-core/modules/box-scores/box-scores.module.html'
})

export class BoxScoresModule implements OnInit {
  @Input() boxScores:any;

  ngOnInit() {
  }
}
