
import {AfterViewInit, Component, ElementRef, Input, Renderer, ViewChild} from "@angular/core";

@Component({
  selector: "embed-video-deepdive",
  templateUrl: "./embed-video-deepdive.html"
})

export class EmbedVideoDeepdive implements AfterViewInit{
  @ViewChild('embedHere') private videoEmbedElement: ElementRef;
  @Input() videoData;
  videoSource;
  videoDatatype;
  videoClassList;

  constructor(private _eref: ElementRef, private _render: Renderer){}

  ngAfterViewInit(){
    let videoEmbedDiv = this.videoEmbedElement.nativeElement;
    var addedScripts = this._eref.nativeElement.querySelector('videoScriptFile');
    var disablePlayer = this._eref.nativeElement.querySelector('.s2nPlayerDisabled');
    if( addedScripts === null && videoEmbedDiv !== null ) {
      this.loadVideo(videoEmbedDiv);
      if(disablePlayer!==null){
        this.loadVideo(videoEmbedDiv);
      }
    }

  }

  loadVideo(ele){
    this.videoSource = this.videoData[0].videoSource;
    this.videoDatatype = this.videoData[0].videoDatatype;
    this.videoClassList = this.videoData[0].videoClassList;
    var videoDiv = this._render.createElement(ele,'div');
    videoDiv.classList.add(this.videoClassList[0], this.videoClassList[1]);
    videoDiv.setAttribute('data-type', 'float');
    ele.innerHTML = '';
    ele.appendChild(videoDiv);

    if(this.videoSource !== null){
      var videoScript = this._render.createElement(ele,'script');
      videoScript.id = "videoScriptFile";
      videoScript.type = 'text/javascript';
      videoScript.setAttribute('data-type', this.videoDatatype);
      videoScript.src = this.videoSource;

    }
  }
}
