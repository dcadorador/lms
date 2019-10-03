import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { ApiService } from '../../app/services/api.service';
import { GlobalProvider } from '../../providers/global/global';
import { LmsPopoverPage } from '../lms-popover/lms-popover';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the LmsViewResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lms-view-results',
  templateUrl: 'lms-view-results.html',
})
export class LmsViewResultsPage {

  public from: String = null;
  public lms_content: any = null;
  public lms_module_title: String = null;
  public lms_title: String = null;
  public lms_progress: any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private apiService: ApiService,
    public global: GlobalProvider,
    private popoverCtrl: PopoverController,
    public sanitizer: DomSanitizer
  ) {

    this.from = this.navParams.get('from')
    this.lms_title = localStorage.getItem('lms_title')

    if (this.from === 'reports') {
      let lesson_id = this.navParams.get('lesson_id')
      let entry_id = this.navParams.get('entry_id')
      this.apiService.getLMSResults(lesson_id, entry_id).subscribe(
        data => {
          console.log('results: ', data)
          if (data.content) {
            this.lms_content =this.sanitizer.bypassSecurityTrustHtml(data.content);
          }
        },
        error => { console.log('error: ', error) }
      )
    } else {
      this.lms_content = this.sanitizer.bypassSecurityTrustHtml(this.navParams.get('content'));
      this.lms_module_title = this.global.lms_module_title
      this.lms_progress = this.global.lms_progress
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LmsViewResultsPage');
  }

  next() {
    if (this.from === 'reports') {
      this.navCtrl.pop()
    } else {
      // check for the next
      this.events.publish('lms:next')
    }
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(LmsPopoverPage);
    popover.present({ev: event});   
  }

}
