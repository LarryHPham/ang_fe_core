import {Directive, ElementRef, Renderer, HostListener} from "@angular/core";
@Directive({
    selector:'[verticalWidgetScroll]'
})
export class verticalWidgetScrollDirective{
    scrollTopPrev:number = 0;
    constructor(private _elref:ElementRef, private _render:Renderer){

    }
    @HostListener('window:scroll',['$event']) onScroll(e){
        // this.scrollWidget=e.target.getElementById('verticalSideScroller');
        // var partnerHeader= e.target.getElementById('topPartnerHeader');
        // var partnerHeaderHeight=partnerHeader? partnerHeader.offsetHeight : 0;
        // var header = e.target.body.getElementsByClassName('header')[0];
        // var sharebtns = e.target.getElementById('shareLinksBtn');
        // var articleTitle = e.target.getElementById('articleMainTitle');
        // var carouselHeight = e.target.getElementById('rectangleCarousel');
        // var videoElement = e.target.getElementById('rectangleBoxvideo');
        //
        // var fixedHeader = e.target.body.getElementsByClassName('fixedHeader')[0] != null ? e.target.body.getElementsByClassName('fixedHeader')[0].offsetHeight : 0;
        // var footer = e.target.body.getElementsByClassName('footer')[0];
        // let topCSS = 0;
        // topCSS = header != null ? topCSS + header.offsetHeight : topCSS;
        // topCSS = sharebtns !=null ? topCSS + sharebtns.offsetHeight + 25 : topCSS;
        // topCSS = articleTitle != null ? topCSS + articleTitle.offsetHeight : topCSS;
        // topCSS = carouselHeight != null? topCSS +carouselHeight.offsetHeight :topCSS;
        // topCSS = videoElement != null ? topCSS + videoElement.offsetHeight : topCSS;
        // topCSS = topCSS - fixedHeader;
        // let bottomCSS=0;
        // bottomCSS = footer!=null? bottomCSS + footer.offsetHeight: bottomCSS;
        //
        // var scrollTop =e.target.documentElement.scrollTop?e.target.documentElement.scrollTop:e.target.body.scrollTop;
        // let scrollUp = scrollTop - this.scrollTopPrev>0?true:false;
        // let scrolHeight=e.target.documentElement.scrollHeight?e.target.documentElement.scrollHeight:e.target.body.scrollHeight;
        // var scrollBottom = scrolHeight-scrollTop==e.target.body.clientHeight?true:false;
        //
        // this.scrollTopPrev=scrollTop;
        // if(this.scrollWidget){
        //     var scrollYaxis= window.pageYOffset ? window.pageYOffset : window.scrollY;
        //     if(scrollYaxis>topCSS){
        //        if(scrollUp) {
        //             var topstyle = scrollYaxis - topCSS + 'px';
        //             this._render.setElementStyle(this.scrollWidget, 'top', topstyle);
        //         }else{
        //             var topstyle = scrollYaxis - topCSS + partnerHeaderHeight + 35 +'px';
        //             this._render.setElementStyle(this.scrollWidget, 'top', topstyle);
        //         }
        //         if(scrollBottom && window.innerHeight - footer.offsetHeight < 650){
        //             var newTopCSS =scrollYaxis - topCSS - bottomCSS  + partnerHeaderHeight+ 'px';
        //             this._render.setElementStyle(this.scrollWidget,'top', newTopCSS);
        //         }
        //
        //     }else{
        //         this._render.setElementStyle(this.scrollWidget, 'top', '0px');
        //
        //     }
        // }
        let verticalWidget = e.target.getElementById('verticalSideScroller');
        let footer = e.target.getElementsByClassName('footer')[0];
        var scrollTop = e.target.body.scrollTop; //find the current scroll of window from top of page
        let scrollUp = scrollTop - this.scrollTopPrev > 0 ? false : true;
        var header = e.target.getElementById('pageHeader'); // grab the height of the entire header
        var headerbottom = e.target.getElementById('header-bottom'); // grab the bottom piece of the header that sticks on scroll
        var widgetContainer = e.target.getElementById('widgetContainer');// grab the container that the widget lives in
        var widget = e.target.getElementById('widget');// grab the actual widget so we can add the fixed classed to it
        let widgetFixed = e.target.getElementsByClassName('fixedWidget')[0]; // if the fixedWidget class exist grab it to be used
        //set the scroll height that the widget needs to meet before sticking
        let scrollAmount = widgetContainer != null ? widgetContainer.getBoundingClientRect().top : 0;

        this.scrollTopPrev = scrollTop; // help with determining if scrolling up or down

        let bottomPadding = (scrollTop + scrollAmount) + (header.offsetHeight + headerbottom.offsetHeight) - footer.getBoundingClientRect().top; // add scroll from top, the widget position on load, the height of the headers for padding, and the distance from footer to top of page

        if(widgetFixed){// if the widget is already fixed then be sure to add the header height when scrolling up
          scrollAmount = scrollAmount - header.offsetHeight;
        }

        //if the scroll amount reaches the sticky header then add padding in place of the missing header since its fixed and determine if a fixedWidget class needs to be added of not
        if(scrollAmount < headerbottom.offsetHeight){
          if(header.getBoundingClientRect().top >= 0){
            this._render.setElementStyle(widget,'top', header.offsetHeight + 10 + 'px');
          }else{
            this._render.setElementStyle(widget,'top', headerbottom.offsetHeight + 10 + 'px');
          }
          widget.classList.add('fixedWidget');// add fixedWidget to widget so that it stays fixed
          if(bottomPadding >= 0){ //once the widget is fixed then check to make sure it does not go below footer
            if(scrollUp){// when scrolling up need to add the extra padding from header
              this._render.setElementStyle(widget,'top', (header.offsetHeight - bottomPadding) + 'px');
            }else{
              this._render.setElementStyle(widget,'top', (headerbottom.offsetHeight - bottomPadding) + 'px');
            }
          }
        }else{
          this._render.setElementStyle(widget,'top', '0px');
          widget.classList.remove('fixedWidget');
        }
    }
}
