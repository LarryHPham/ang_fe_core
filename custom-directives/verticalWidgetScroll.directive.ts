import {Directive, ElementRef, Renderer, HostListener, Input} from "@angular/core";
@Directive({
    selector:'[verticalWidgetScroll]'
})
export class verticalWidgetScrollDirective{
    @Input() scrollWidget;
    @Input() topCSS;
    @Input() bottomCSS;
    scrollTopPrev:number = 0;
    constructor(private _elref:ElementRef, private _render:Renderer){

    }
    @HostListener('window:scroll',['$event']) onScroll(e){
        this.scrollWidget=e.target.getElementById('verticalSideScroller');
        var header = e.target.body.getElementsByClassName('header')[0];
        var sharebtns = e.target.getElementById('shareLinksBtn');
        var articleTitle = e.target.getElementById('articleMainTitle');
        var carouselHeight = e.target.getElementById('rectangleCarousel');
        var videoElement = e.target.getElementById('rectangleBoxvideo');

        var fixedHeader = e.target.body.getElementsByClassName('fixedHeader')[0] != null ? e.target.body.getElementsByClassName('fixedHeader')[0].offsetHeight : 0;
        var footer = e.target.body.getElementsByClassName('footer')[0];
        let topCSS = 0;
        topCSS = header != null ? topCSS + header.offsetHeight : topCSS;
        topCSS = sharebtns !=null ? topCSS + sharebtns.offsetHeight : topCSS;
        topCSS = articleTitle != null ? topCSS + articleTitle.offsetHeight : topCSS;
        topCSS = carouselHeight != null? topCSS +carouselHeight.offsetHeight :topCSS;
        topCSS = videoElement != null ? topCSS + videoElement.offsetHeight : topCSS;
        topCSS = topCSS - fixedHeader;

        let bottomCSS=0;
        bottomCSS = footer!=null? bottomCSS + footer.offsetHeight: bottomCSS;

        var scrollTop = e.target.body.scrollTop;
        let scrollUp = scrollTop - this.scrollTopPrev>0?true:false;
        var scrollBottom = e.target.body.scrollHeight-e.target.body.scrollTop==e.target.body.clientHeight?true:false;

        this.scrollTopPrev=scrollTop;
        if(this.scrollWidget){
            if(window.scrollY>topCSS){
                if(scrollUp) {
                    var topstyle = window.scrollY - topCSS + 'px';
                    this._render.setElementStyle(this.scrollWidget, 'top', topstyle);
                }else{
                    var headerTop=e.target.body.getElementsByClassName('header-top')[0];
                    var partnerheadTop=e.target.getElementById('partner_header')?document.getElementById('partner_header').offsetHeight:0;
                    var topstyle = headerTop.offsetHeight? window.scrollY - topCSS + headerTop.offsetHeight + partnerheadTop + 35 + 'px' :window.scrollY - topCSS + partnerheadTop + 'px';
                    this._render.setElementStyle(this.scrollWidget, 'top', topstyle);
                }
                if(scrollBottom && window.innerHeight - footer.offsetHeight <600){
                    var newTopCSS =window.scrollY - topCSS - bottomCSS - 30+ 'px';
                    this._render.setElementStyle(this.scrollWidget,'top', newTopCSS);
                }


            }else{
                this._render.setElementStyle(this.scrollWidget, 'top', '0px');

            }
        }

    }
}
