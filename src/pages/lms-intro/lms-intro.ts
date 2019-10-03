import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalProvider } from '../../providers/global/global';
import { LmsPopoverPage } from '../lms-popover/lms-popover';

@IonicPage()
@Component({
  selector: 'page-lms-intro',
  templateUrl: 'lms-intro.html',
})
export class LmsIntroPage {
  lms: any= null;
  lms_title: any=null;
  lms_content: any = null;
  

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public sanitizer: DomSanitizer,
     public global: GlobalProvider,
     private events: Events,
     private popoverCtrl: PopoverController,
  ) {
      this.lms_content = this.sanitizer.bypassSecurityTrustHtml(this.navParams.get('content'));
      this.lms_title = localStorage.getItem('lms_title');

      this.global.button_text = this.navParams.get('button_text') ? this.navParams.get('button_text') : "START";

      if (!this.lms_content) {
        this.events.publish('lms:next', '')
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LmsIntroPage');
  }

  lmsStart(){
    this.events.publish('lms:next', 'course-intro')
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(LmsPopoverPage);
    popover.present({ev: event});   
  }
}
