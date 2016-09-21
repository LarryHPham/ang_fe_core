import {Component, Input, OnInit} from '@angular/core';
import { ImageData } from '../image-data';

/**
 *
 * Description:
 *  Creates an image component with a circular border, an optional
 *    linking URL, and optional circular sub elements in each of the four corners
 *    of the main image.
 *
 *  When an image (either main or sub) has an associated URL, it
 *    will display a transparent overlay with optional text on mouse-over.
 *
 *  Data must be of CircleImageData type
 *
 * Styling:
 *  The main and sub elements each can have an imageClass, as well as the
 *  component as a whole.
 *
 *  The style for the whole component (data.imageClass) is used mainly to
 *  set the main image's size, while the style for the main image (data.mainImage.imageClass)
 *  is used to set the main image's border.
 *
 *  The style for the sub images/text elements (data.subImages[i].imageClass) is used
 *  to set both the size and border.
 *
 *  The following LESS styles are available when using this control -
 *
 *    * .roundImageMain(@diameter)
 *      + specifies the size of the main image
 *      + should be referenced by the style set in data.imageClass
 *
 *    * .roundImageSub(@diameter)
 *      + specifies the size of the sub image
 *      + should be referenced by the style set in data.subImages[i].imageClass
 *
 *    * .roundText(@widthHeight, @shadowSize, @shadowColor@bgColor, @fontSize)
 *      + specifies the size, font, and border of sub text elements (that contain no image)
 *      + should be referenced by the style set in data.subImages[i].imageClass
 *
 *    * .imageShadow(@shadowSize, @shadowColor)
 *      + specifies the border of main and sub images
 *      + should be referenced by the style set in data.mainImage.imageClass
 *        or data.subImages[i].imageClass
 *
 * To specify sub image position, include one of the following for the sub image's imageClass:
 *    .image-round-upper-left
 *    .image-round-upper-right
 *    .image-round-lower-left
 *    .image-round-lower-right
 *
 * To customize hover color, the corresponding element is selected as follows:
 *    .image-round-hover div {
 *       background-color: @hoverColor;
 *    }
 */
export interface CircleImageData {
 /**
  * The main image in the center of the component.
  * Required.
  */
 mainImage: ImageData;

 /**
  * The sub images to display in one of the corners.
  * The user is expected to specify a location, and only one
  * element per location. Listing no location or multiple
  * elements for one location is undefined behavior.
  *
  * Possible locations:
 *    .image-round-upper-left
 *    .image-round-upper-right
 *    .image-round-lower-left
 *    .image-round-lower-right
  */
 subImages?: Array<ImageData>;

 /**
  * The style to use for the entire component. It should
  * specify the width/height of the component.
  */
 imageClass: string;
}

@Component({
    selector: 'circle-image',
    templateUrl: './app/fe-core/components/images/circle-image/circle-image.html',
})

export class CircleImage implements OnInit {
    @Input() data: CircleImageData;

    ngOnInit() {
      var sampleImage = "/app/public/placeholder_XL.png";
      if ( typeof this.data === undefined ) {
        this.data = {
          imageClass: "image-150",
          mainImage: {
            urlRouteArray: ['syndicated-article'],
            hoverText: "<p>View</p> Profile",
            imageClass: "border-large",
            imageUrl: "/app/public/profile_placeholder.png"
          }
        }
      }
    }
}
