import {Directive, ElementRef, Renderer, HostListener} from "@angular/core";
@Directive({
    selector:'[verticalWidgetScroll]'
})
export class verticalWidgetScrollDirective{
    scrollWidget;
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
        topCSS = sharebtns !=null ? topCSS + sharebtns.offsetHeight + 25 : topCSS;
        topCSS = articleTitle != null ? topCSS + articleTitle.offsetHeight : topCSS;
        topCSS = carouselHeight != null? topCSS +carouselHeight.offsetHeight :topCSS;
        topCSS = videoElement != null ? topCSS + videoElement.offsetHeight : topCSS;
        topCSS = topCSS - fixedHeader;
        let bottomCSS=0;
        bottomCSS = footer!=null? bottomCSS + footer.offsetHeight: bottomCSS;

        var scrollTop =e.target.documentElement.scrollTop?e.target.documentElement.scrollTop:e.target.body.scrollTop;
        let scrollUp = scrollTop - this.scrollTopPrev>0?true:false;
        let scrolHeight=e.target.documentElement.scrollHeight?e.target.documentElement.scrollHeight:e.target.body.scrollHeight
        var scrollBottom = scrolHeight-scrollTop==e.target.body.clientHeight?true:false;

        this.scrollTopPrev=scrollTop;
        if(this.scrollWidget){
            var scrollYaxis= window.pageYOffset? window.pageYOffset: window.scrollY;
            if(scrollYaxis>topCSS){
               if(scrollUp) {
                    var topstyle = scrollYaxis - topCSS + 'px';
                    this._render.setElementStyle(this.scrollWidget, 'top', topstyle);
                }else{
                    var headerTop=e.target.body.getElementsByClassName('header-top')[0];
                    var partnerheadTop=e.target.getElementById('partner_header')?document.getElementById('partner_header').offsetHeight:0;
                    var topstyle = headerTop.offsetHeight? scrollYaxis - topCSS + headerTop.offsetHeight + partnerheadTop + 35 + 'px' :scrollYaxis - topCSS + partnerheadTop + 'px';
                    this._render.setElementStyle(this.scrollWidget, 'top', topstyle);
                }
                if(scrollBottom && window.innerHeight - footer.offsetHeight < 650){
                    var newTopCSS =scrollYaxis - topCSS - bottomCSS + 'px';
                    this._render.setElementStyle(this.scrollWidget,'top', newTopCSS);
                }


            }else{
                this._render.setElementStyle(this.scrollWidget, 'top', '0px');

            }
        }

    }
}
