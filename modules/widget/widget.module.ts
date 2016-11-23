import {Component, Input} from '@angular/core';
import {Http, Headers} from '@angular/http';

declare var jQuery:any;

@Component({
    selector: 'widget-module',
    templateUrl: './app/fe-core/modules/widget/widget.module.html',

})

export class WidgetModule {
    @Input() aiSidekick:boolean;
    @Input() syndicated:boolean;
    @Input() scope:string;
    sidekickHeight:number = 0;
    headerHeight:string;
    isProSport:boolean = true;

    ngOnInit() {
        this.isProSport = this.scope == 'nfl' ? true : false;
        var titleHeight = jQuery('.articles-page-title').height();
        var padding = document.getElementById('pageHeader').offsetHeight;

        if (document.getElementById('partner') != null) {
            var partnerHeight = document.getElementById('partner').offsetHeight;
            padding += partnerHeight;
        }
        if (!this.syndicated && !this.aiSidekick) {
            this.headerHeight = padding + 'px';
        } else {
            if (titleHeight == 44) {
                this.headerHeight = padding + 99 + 'px';
            } else if (titleHeight == 84) {
                this.headerHeight = padding + 139 + 'px';
            }
            else if (titleHeight == 74) {
                this.headerHeight = padding + 132 + 'px';
            }
            else if (titleHeight == 39) {
                this.headerHeight = padding + 106 + 'px';
            }
        }
    }

    // Page is being scrolled
    onScroll(event) {
        var partnerHeight = 0;
        if (document.getElementById('partner') != null) {
            partnerHeight = document.getElementById('partner').offsetHeight;
        }
        var titleHeight = 0;
        var padding = document.getElementById('pageHeader').offsetHeight;
        var y_buffer = 23;
        var scrollTop = jQuery(window).scrollTop();
        var maxScroll = partnerHeight - scrollTop;
        if (!this.syndicated && !this.aiSidekick) {
            this.sidekickHeight = 0;
        } else {
            titleHeight = jQuery('.articles-page-title').height();
            if (titleHeight == 44) {//
                this.sidekickHeight = 99;
            } else if (titleHeight == 84) {
                this.sidekickHeight = 139;
            }
            else if (titleHeight == 74) {
                this.sidekickHeight = 132;
            }
            else if (titleHeight == 39) {
                this.sidekickHeight = 106;
            }
            if (maxScroll <= 0) {
                this.sidekickHeight += maxScroll;
                if (this.sidekickHeight < 0) {
                    this.sidekickHeight = 0
                }
            }
            y_buffer += this.sidekickHeight;
        }
        if (maxScroll <= 0) {
            maxScroll = 0;
        }
        this.headerHeight = padding + maxScroll + this.sidekickHeight + 'px';
        if ((document.getElementById('partner') != null && maxScroll == 0) || (document.getElementById('partner') == null && scrollTop >= padding)) {
            jQuery("#widget").addClass("widget-top");
        }
        else {
            jQuery("#widget").removeClass("widget-top");
        }
        var carContainer = jQuery(".carousel-container").height();
        var $widget = jQuery("#widget");
        var $pageWrapper = jQuery(".widget-page-wrapper");
        if ($widget.length > 0 && $pageWrapper.length > 0) {
            var widgetHeight = $widget.height();
            var pageWrapperTop = $pageWrapper.offset().top;
            var pageWrapperBottom = pageWrapperTop + $pageWrapper.height() - padding;
            if ((scrollTop + widgetHeight + y_buffer) > (pageWrapperBottom + this.sidekickHeight)) {
                this.headerHeight = this.sidekickHeight + 'px';
                $widget.addClass("widget-bottom");
                var diff = $pageWrapper.height() - (widgetHeight + y_buffer);
                $widget.get(0).style.top = diff + "px";
            }
            else if ((scrollTop + carContainer) < (pageWrapperTop + this.sidekickHeight)) {
                $widget.removeClass("widget-bottom");
                $widget.get(0).style.top = "";
            }
            else {
                $widget.removeClass("widget-bottom");
                $widget.get(0).style.top = "";
            }
        }
    }
}
