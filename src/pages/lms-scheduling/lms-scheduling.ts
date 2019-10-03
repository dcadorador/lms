import { Component } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, PopoverController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { ApiService } from '../../app/services/api.service';
import { LmsPopoverPage } from '../lms-popover/lms-popover';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the LmsSchedulingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lms-scheduling',
  templateUrl: 'lms-scheduling.html',
})
export class LmsSchedulingPage {

  public lms_content:any;
  public lms_title:any;
  public lms_start_date: String;
  public lms_min_date: String;
  public lms_max_date: String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    public global: GlobalProvider,
    private apiService: ApiService,
    private popoverCtrl: PopoverController,
    public sanitizer: DomSanitizer
  ) {
    this.lms_content = this.sanitizer.bypassSecurityTrustHtml(this.navParams.get('content'));
    this.lms_title = localStorage.getItem('lms_title')
    this.lms_min_date = new Date().toISOString()
    this.lms_max_date = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
    this.global.button_text = this.navParams.get('button_text') ? this.navParams.get('button_text') : "NEXT";


    this.initModuleInfo()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LmsSchedulingPage')
  }

  lmsActionDone() {
    if (!this.lms_start_date) {
      this.global.showAlert("Please Try Again", "Enter a date for your next schedule");
      return
    }

    this.events.publish('lms:next', { current_content : 'course-module-scheduler', params : { start_date: this.lms_start_date } })
  }

  initModuleInfo() {
    if (!this.global.lms_module_title) {
      this.apiService.getLMSModuleInfo().subscribe(
        data => {
          this.global.lms_module_title = data.current_module.module_title
          this.global.lms_progress = data.progress.computed
        },
        error => {}
      )
    }
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(LmsPopoverPage);
    popover.present({ev: event});   
  }
}
