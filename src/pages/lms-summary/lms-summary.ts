import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../../app/services/api.service';
import { GlobalProvider } from '../../providers/global/global';
import { LmsPopoverPage } from '../lms-popover/lms-popover';

@IonicPage()
@Component({
  selector: 'page-lms-summary',
  templateUrl: 'lms-summary.html',
})
export class LmsSummaryPage {

  lms_title: any=null;
  lms_content: any = null;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private apiService: ApiService,
     public sanitizer: DomSanitizer,
     public global: GlobalProvider,
     private events: Events,
     private popoverCtrl: PopoverController,
  ) {

      this.global.is_loading = false; 
      this.lms_content = this.sanitizer.bypassSecurityTrustHtml(this.navParams.get('content'));
      this.lms_title = localStorage.getItem('lms_title');
      this.global.button_text = this.navParams.get('button_text') ? this.navParams.get('button_text') : "START MODULE";


      this.apiService.getLMSModuleInfo().subscribe(
        data => {
          console.log('module info : ', data)
          this.global.lms_module_title = data.current_module.module_title
          this.global.lms_progress = data.progress.computed
          
        },

        error => {}

      )
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LmsSummaryPage');
  }

  lmsStartModule(){
    this.events.publish('lms:next', 'course-module')
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(LmsPopoverPage);
    popover.present({ev: event});   
  }

}
