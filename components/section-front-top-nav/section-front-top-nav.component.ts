import {Component, Input, OnInit} from '@angular/core';


@Component({
    selector: 'section-front-top-nav',
    templateUrl: './app/fe-core/components/section-front-top-nav/section-front-top-nav.component.html'
})

export class SectionFrontTopNav{
  @Input() scope: string;
  @Input() topScope: string;
  @Input() scopeList:string;
  @Input() pageScope: string;

    // ngOnChanges(){
    //   console.log("scope", this.scope);
    //   console.log("scopelist", this.scopeList);
    // }
}
