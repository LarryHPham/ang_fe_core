import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeStyle} from '@angular/platform-browser';
import { Router} from '@angular/router';

import { GlobalFunctions } from '../../../global/global-functions';
import { GlobalSettings } from '../../../global/global-settings';
import { VerticalGlobalFunctions } from '../../../global/vertical-global-functions';

// Interfaces
import { CircleImageData } from "../../interfaces/image-data";
import { DataItem, ProfileHeaderData } from "../../../services/profile-header.service";

//pipes
import { NaValuePipe } from "../../pipes/na.pipe";

@Component({
    selector: 'profile-header',
    templateUrl: './app/fe-core/modules/profile-header/profile-header.module.html'
})

export class ProfileHeaderModule implements OnChanges {
  @Input() profileHeaderData: ProfileHeaderData;
  //@Input() profileType: string;

  public contentTitle: string = "Quick info";
  public displayDate: string;
  public profileTitle: string;
  public backgroundImage: SafeStyle;
  public imageConfig: CircleImageData = {
    imageClass: "image-180",
    mainImage: {
      imageClass: "border-large",
      placeholderImageUrl: ""
    }
  };
  public logoConfig: CircleImageData = {
    imageClass: "image-40",
      mainImage: {
        imageClass: "",
        imageUrl: GlobalSettings.getSiteLogoUrl(),
        placeholderImageUrl: GlobalSettings.getSiteLogoUrl()
      }
  };

  constructor(private _sanitizer: DomSanitizer) {}

  ngOnChanges() {
    var data = this.profileHeaderData;
  }
}
