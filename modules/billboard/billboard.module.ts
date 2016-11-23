import {Component, Input, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';
declare var jQuery:any;

@Component({
    selector: 'billboard-module',
    templateUrl: './app/fe-core/modules/billboard/billboard.module.html',
})

export class BillboardModule implements OnInit{
    isSmall:boolean = false;
    @Input() category: string;
    @Input() subCategory: string;
    srcLink: string;
    ngOnInit() {
      if(this.category && this.subCategory){
        if(this.category == "sports"){
          this.srcLink = "/app/ads/billboard.html?category="+this.category+"&sub_category="+this.subCategory;
        }
      } else if(this.category != this.subCategory || this.subCategory == null){
        this.srcLink = "/app/ads/billboard.html?category="+this.category;
      } else {
        this.srcLink = null;
      }
      this.isSmall = window.innerWidth <= 814;
    }

    onResize(event) {
      this.isSmall = event.target.innerWidth <= 814;
    }
}
