import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalProvider } from '../../providers/global/global';
import { LmsPopoverPage } from '../lms-popover/lms-popover';

@IonicPage()
@Component({
  selector: 'page-lms-home',
  templateUrl: 'lms-home.html',
})
export class LmsHomePage {
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
      this.global.is_loading = false;
      this.global.button_text = this.navParams.get('button_text') ? this.navParams.get('button_text') : "START";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LmsHomePage');
  }

  lmsStart(){
    this.events.publish('lms:next', 'course-structure')
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(LmsPopoverPage);
    popover.present({ev: event});   
  }

}
