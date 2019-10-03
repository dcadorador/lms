import { Component } from '@angular/core';
import { NavController, NavParams ,IonicPage} from 'ionic-angular';
import { SafeResourceUrl,DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
  video: any = null;
  video_embed: SafeResourceUrl;

  constructor(
    public navCtrl: NavController,
    public sanitizer: DomSanitizer,
    public navParams: NavParams) 
  {
    this.video = this.navParams.get('video');
    /*if(this.video){
      this.video.meta.forEach((meta) =>{
          if(meta.meta_key == 'video_embed_code') {
            this.video_embed = sanitizer.bypassSecurityTrustHtml(meta.meta_value);
            //console.log(this.video_embed);
          }
      });  
    }*/
    console.log(this.video);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');
  }

  videoURL() {
    this.video_embed = this.sanitizer.bypassSecurityTrustResourceUrl(this.video.video_src);
    return this.video_embed;
  }

}
