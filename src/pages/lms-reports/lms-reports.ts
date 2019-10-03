import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { ApiService } from '../../app/services/api.service';
import { LmsPopoverPage } from '../lms-popover/lms-popover';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the LmsReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lms-reports',
  templateUrl: 'lms-reports.html',
})
export class LmsReportsPage {


  public report_quizes = null
  public lms_title: String = null

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private apiService: ApiService,
    private popoverCtrl: PopoverController,
    public global: GlobalProvider,
  ) {
    this.lms_title = localStorage.getItem('lms_title')
    this.apiService.getLMSReport().subscribe(
      data => {
        this.report_quizes = data
        // console.log('reports: ', data)
      },

      error => {
        console.log('error : ', error)
      }
    )

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LmsReportsPage');
  }

  close() {
    this.navCtrl.pop();
  }

  show(quiz) {
    this.navCtrl.push('LmsViewResultsPage', { 
      from: 'reports',
      lesson_id: quiz.lesson_id,
      entry_id: quiz.lesson_entry_id
    });
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(LmsPopoverPage);
    popover.present({ev: event});   
  }

}
