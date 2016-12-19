import {Component, Input, ElementRef, Renderer, Output, EventEmitter} from "@angular/core";

@Component({
    selector:'search-results',
    templateUrl:'./app/fe-core/modules/search-article-results/search-article-results.module.html'
})
export class SearchArticleResults{
    @Input() searchArticlesData:Array<any>;
    @Input() userInput:string;
    @Input() totalPages:any;
    @Input() articleTotalCount:number;
    @Output() emitPageNum: EventEmitter<any>=new EventEmitter();
    @Input() currentPage:number;

    startCount:number=1;
    EndCount:number=this.startCount*10;
    pageNum:number =1;
    error:any;

    constructor(private elementRef:ElementRef, private render:Renderer){
    }
    ngOnInit(){
        this.error={
            message:"Sorry we can't find articles matching your search term(s) " +  this.userInput + ", please try your search again.",
            icon:"fa-search-icon",
        };

    }
    ngOnChanges(){
        console.log(this.totalPages,"total pages");
        this.pageNum=this.currentPage+1;
        var topRight=this.elementRef.nativeElement.getElementsByClassName('s-module_page-num_right_arrow-r')[0];
        var bottomRight=this.elementRef.nativeElement.getElementsByClassName('s-module_page-num_right_arrow-r')[1];
        var topLeft=this.elementRef.nativeElement.getElementsByClassName('s-module_page-num_right_arrow')[0];
        var bottomLeft=this.elementRef.nativeElement.getElementsByClassName('s-module_page-num_right_arrow')[1];
        if(this.totalPages==1){
            this.render.setElementStyle(topRight,'opacity','0.2');
            this.render.setElementStyle(topRight,'backgroundColor','#fff');
            this.render.setElementStyle(topRight,'border','1px solid #444');
            this.render.setElementStyle(topRight.firstElementChild,'color','#444');
            this.render.setElementStyle(topRight,'cursor','default');
            this.render.setElementStyle(bottomRight,'opacity','0.2');
            this.render.setElementStyle(bottomRight,'backgroundColor','#fff');
            this.render.setElementStyle(bottomRight,'border','1px solid #444');
            this.render.setElementStyle(bottomRight.firstElementChild,'color','#444');
            this.render.setElementStyle(bottomRight,'cursor','default');
            this.render.setElementStyle(topLeft,'opacity','0.2');
            this.render.setElementStyle(topLeft,'backgroundColor','#fff');
            this.render.setElementStyle(topLeft,'border','1px solid #444');
            this.render.setElementStyle(topLeft.firstElementChild,'color','#444');
            this.render.setElementStyle(topLeft,'cursor','default');
            this.render.setElementStyle(bottomLeft,'opacity','0.2');
            this.render.setElementStyle(bottomLeft,'backgroundColor','#fff');
            this.render.setElementStyle(bottomLeft,'border','1px solid #444');
            this.render.setElementStyle(bottomLeft.firstElementChild,'color','#444');
            this.render.setElementStyle(bottomLeft,'cursor','default');

        }


    }
    previousPage(e){
        this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[0].lastElementChild.lastElementChild,'opacity','1');
        this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[0].lastElementChild.lastElementChild,'backgroundColor','#00b9e3');
        this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[0].lastElementChild.lastElementChild,'border','none');
        this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[0].lastElementChild.lastElementChild.firstElementChild,'color','#fff');
        this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[2].lastElementChild.lastElementChild,'opacity','1');
        this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[2].lastElementChild.lastElementChild,'backgroundColor','#00b9e3');
        this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[2].lastElementChild.lastElementChild,'border','none');
        this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[2].lastElementChild.lastElementChild.firstElementChild,'color','#fff');
        this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[0].lastElementChild.lastElementChild,'cursor','pointer');
        this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[2].lastElementChild.lastElementChild,'cursor','pointer');

        if(this.pageNum>1){
            this.pageNum--;
            this.render.setElementStyle(e.target.parentElement,'cursor','pointer');
        }
        if(this.pageNum==1){
            this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[0].lastElementChild.firstElementChild,'cursor','default');
            this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[2].lastElementChild.firstElementChild,'cursor','default');
            this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[0].lastElementChild.firstElementChild,'opacity','0.2');
            this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[2].lastElementChild.firstElementChild,'opacity','0.2');
        }
        this.emitPageNum.emit(this.pageNum-1);
        this.startCount=(this.pageNum-1)*10+1;
        this.EndCount=this.startCount+9;

    }
    nextPage(e){
        this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[0].lastElementChild.firstElementChild,'cursor','pointer');
        this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[2].lastElementChild.firstElementChild,'cursor','pointer');
        if(this.pageNum<this.totalPages){
            this.pageNum++;
        }
        if(this.pageNum>1){
            this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[0].lastElementChild.firstElementChild,'opacity','1');
            this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[2].lastElementChild.firstElementChild,'opacity','1');
        }
        if(this.pageNum==this.totalPages){
            this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[0].lastElementChild.lastElementChild,'opacity','0.2');
            this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[0].lastElementChild.lastElementChild,'backgroundColor','#fff');
            this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[0].lastElementChild.lastElementChild,'border','1px solid #444');
            this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[0].lastElementChild.lastElementChild.firstElementChild,'color','#444');
            this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[0].lastElementChild.lastElementChild,'cursor','default');
            this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[2].lastElementChild.lastElementChild,'opacity','0.2');
            this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[2].lastElementChild.lastElementChild,'backgroundColor','#fff');
            this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[2].lastElementChild.lastElementChild,'border','1px solid #444');
            this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[2].lastElementChild.lastElementChild.firstElementChild,'color','#444');
            this.render.setElementStyle(e.target.offsetParent.lastElementChild.children[0].children[2].lastElementChild.lastElementChild,'cursor','default');

        }
        this.emitPageNum.emit(this.pageNum-1);
        this.startCount=(this.pageNum-1)*10+1;
        this.EndCount=this.startCount+9;
    }

}
