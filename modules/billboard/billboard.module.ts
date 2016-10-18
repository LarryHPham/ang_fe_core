import {Component, Input, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';
declare var jQuery:any;

@Component({
    selector: 'billboard-module',
    templateUrl: './app/fe-core/modules/billboard/billboard.module.html',
})

export class BillboardModule implements OnInit{
    isSmall:boolean = false;

    ngOnInit() {
        this.isSmall = window.innerWidth <= 814;
    }

    onResize(event) {
            this.isSmall = event.target.innerWidth <= 814;
    }
}