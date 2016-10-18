import {Component, Input, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';
declare var jQuery:any;

@Component({
    selector: 'chatterbox-module',
    templateUrl: './app/fe-core/modules/chatterbox/chatterbox.module.html',
})

export class ChatterboxModule implements OnInit {
    isSmall:boolean = false;

    ngOnInit() {
        this.resizeIframe('chatterbox');
    }

    onResize(event) {
        this.resizeIframe('chatterbox');
    }

    resizeIframe(iframeID) {
    }
}