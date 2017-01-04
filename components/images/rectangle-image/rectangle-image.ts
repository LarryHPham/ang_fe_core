import {Component, Input, OnInit} from '@angular/core';
import {RectangleImageData} from '../image-data';

@Component({
    selector: 'rectangle-image',
    templateUrl: './rectangle-image.html',
})
export class RectangleImage implements OnInit{
    @Input() data: RectangleImageData;

    ngOnInit() {}
}
