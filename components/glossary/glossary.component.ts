import {Component,OnInit,Input} from '@angular/core';
import {SanitizeHtml} from "../../pipes/safe.pipe";

export interface GlossaryData{
  terms: string;
}

@Component({
  selector: 'glossary-component',
  templateUrl: './app/fe-core/components/glossary/glossary.component.html',
  pipes: [SanitizeHtml]
})

export class GlossaryComponent implements OnInit{
  public title: string = "Glossary";
  @Input() glossaryData: Array<GlossaryData>;
  public classType: string;
  getClassType(){
    var termsCount = this.glossaryData.length;
    if(termsCount > 6){
      this.classType = "col-xs-4";
    } else {
      this.classType = "col-xs-6";
    }
  }
  ngOnInit() {
    this.getClassType();
  }//ngOnInit ends
}
