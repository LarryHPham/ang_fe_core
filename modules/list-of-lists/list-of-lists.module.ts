import {Component} from '@angular/core';
import {DetailedListItem, DetailListInput} from '../../components/detailed-list-item/detailed-list-item.component';
import {ModuleFooter} from "../../components/module-footer/module-footer.component";
import {ModuleHeader} from '../../components/module-header/module-header.component';
import {ListOfListsItem} from "../../components/list-of-lists-item/list-of-lists-item.component";
import {ModuleHeaderData} from "../../components/module-header/module-header.component";
import {GlobalFunctions} from '../../../global/global-functions';
import {VerticalGlobalFunctions}  from '../../../global/vertical-global-functions';
import {RouteParams} from "@angular/router-deprecated";
import {Router} from "@angular/router-deprecated";
import {Input} from "@angular/core";
import {ProfileHeaderData} from "../profile-header/profile-header.module";

export interface ListOfListsData {
  listData: any;
}

@Component({
    selector: 'list-of-lists',
    templateUrl: './app/fe-core/modules/list-of-lists/list-of-lists.module.html',
    directives: [ModuleHeader, ModuleFooter, ListOfListsItem],
})

export class ListOfListsModule{
  @Input() profileHeaderData : ProfileHeaderData;
  @Input() listOfListsData : ListOfListsData;
  moduleHeader: ModuleHeaderData;
  displayData: Array<any>;
  footerData: Object;
  constructor(private _router: Router) {
    this.footerData = {
      infoDesc:'Want to see more lists like the ones above?',
      btn:'',
      text:'VIEW MORE LISTS',
      url:['Error-page'], // Gets updated in ngOnChanges
    }
  }

  ngOnChanges(event) {
    var origin = window.location.origin;
    if(typeof event.listOfListsData != 'undefined'){
      this.displayData = this.listOfListsData.listData;
    }

    this.moduleHeader = {
      moduleTitle: "Top Lists - " + this.profileHeaderData.profileName,
      hasIcon: false,
      iconClass: "",
    }
    var type = this.listOfListsData[0]['target'];
    var routeName = type == "league" ? 'List-of-lists' : 'List-of-lists';
    var params = {
      limit:10,
      pageNum:1,
      id: ''
    };
    // localhost:3000/NFL/list-of-lists/:target/:id/:limit/:pagenum


    if ( this.listOfListsData[0]['id'] ) {
      params["id"] = this.listOfListsData[0]['id'];
    }
    if ( type != "league" ) {
      params["type"] = type;
    }
    this.footerData['url'] = origin+'/nfl/'+routeName+'/'+params.id+'/'+params.limit+'/'+params.pageNum;
    console.log(this.footerData['url'])
  }
}
