import { Component, Input, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {

  /*
    VideoComponent prend en entrée : videoUrlInput:string
    C'est l'url de video Youtube
  */
  @Input() videoUrlInput:any;
  videoUrl!:SafeResourceUrl | null; // utilisé dans la vue

  constructor(private sanitizer:DomSanitizer){}

  ngOnInit() {
    console.log('onInit videoUrlInput: ',this.videoUrlInput);
  }

  ngOnChanges() {
    console.log('onChanges videoUrlInput: ', this.videoUrlInput);

    this.videoUrlInput.includes('youtube.com') ?
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrlInput) :
    this.videoUrl = null;
    
  }

}

