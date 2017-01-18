import {Component, Input} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'backtab-component',
    templateUrl: './backtab.component.html',
})

export class BackTabComponent{
    @Input() labelInput : string;
    label : string;

    constructor(private _location: Location){

    }
    goBack() {
      this._location.back();
    }

    ngOnInit(){
        this.label = this.labelInput ? this.labelInput : "Go Back To Previous Page";
    }
}
