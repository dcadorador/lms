import { Component } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, PopoverController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { ApiService } from '../../app/services/api.service';
import { LmsPopoverPage } from '../lms-popover/lms-popover';
import { DomSanitizer } from '@angular/platform-browser';


@IonicPage()
@Component({
  selector: 'page-lms-end',
  templateUrl: 'lms-end.html',
})
export class LmsEndPage {

  public lms_content:any;
  public lms_module_title:any;
  public lms_title:any;
  public lms_progress:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public global: GlobalProvider,
    private apiService: ApiService,
    private popoverCtrl: PopoverController,
    public sanitizer: DomSanitizer
  ) {
    this.lms_content = this.sanitizer.bypassSecurityTrustHtml(this.navParams.get('content'));
    this.lms_title = localStorage.getItem('lms_title')

    this.apiService.getLMSModuleInfo().subscribe(
      data => {
        // this.global.lms_module_title = data.current_module.module_title
        this.global.lms_progress = data.progress.computed
      },
      error => {}
    )

    this.global.button_text = this.navParams.get('button_text') ? this.navParams.get('button_text') : "DONE"
    this.events.publish('app:checklms');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LmsEndPage');
  }


  goConnect() {
    this.navCtrl.push('BookingPage');
  }

  goAsk() {
    this.navCtrl.push('ConnectPage');
  }

  done() {
    this.navCtrl.popToRoot();
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(LmsPopoverPage);
    popover.present({ev: event});   
  }

}
