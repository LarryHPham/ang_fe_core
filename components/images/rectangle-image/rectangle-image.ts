import {Component, Input, OnInit} from '@angular/core';

export interface RectangleImageData{
  imageUrl: any;
  imageClass?: string;
  urlRouteArray?: Array<any>;
  imageDesc?: string;
  /*hoverText?: string;*/
}

@Component({
    selector: 'rectangle-image',
    templateUrl: './app/fe-core/components/images/rectangle-image/rectangle-image.html',
})
export class RectangleImage implements OnInit{
    @Input() data: RectangleImageData;

    ngOnInit() {
      var testImage = "/app/public/Tile_Overlay.png";
      if(typeof this.data === undefined || this.data == null){
        this.data = {
          imageUrl: testImage,
          imageClass: "embed-responsive-16by9",
          urlRouteArray: ["/syndicated-article"],
          imageDesc: "Something about this image"
        }
      }
    }
}
