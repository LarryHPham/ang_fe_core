import {Component, Input} from '@angular/core';
// import {DomSanitizationService} from '@angular/platform-browser';

@Component({
    selector: 'hover-image',
    templateUrl: './hover-image.html',
})

export class HoverImage {
    @Input() imageData: any;
    @Input() textOnly: boolean;
    errorIMG: string = "/app/public/profile_placeholder.png";
    onError(event: any){
      event.src = this.errorIMG;
    }

    ngOnChanges(){
      if(this.imageData){
        this.imageData.imageDesc = this.imageData.imageDesc ? this.imageData.imageDesc : 'Profile Image';
      }
    }
}
