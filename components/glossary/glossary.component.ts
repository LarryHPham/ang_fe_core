import {Component,OnInit,Input} from '@angular/core';
import {SanitizeHtml} from "../../pipes/safe.pipe";
export interface GlossaryData{
  key: string;
  value: string;
}
export interface GlossaryInput{
  title: string;
  glossary: Array<GlossaryData>;
}

@Component({
  selector: 'glossary-component',
  templateUrl: './app/fe-core/components/glossary/glossary.component.html',
  pipes: [SanitizeHtml]
})

export class ArticleStacktopComponent implements OnInit{
  @Input() glossaryData: GlossaryInput;
  ngOnInit() {
    if(this.glossaryData === null){
      this.glossaryData = {
        title: "Glossary",
        glossary: [
          {
            key: "Key 1",
            value: "Value 1"
          },
          {
            key: "Key 2",
            value: "Value 2"
          }
        ]
      }
    }
  }//ngOnInit ends
}
