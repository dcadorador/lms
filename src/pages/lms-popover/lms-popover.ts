import { Component } from '@angular/core';
import { Events, IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lms-popover',
  templateUrl: 'lms-popover.html', 
})
export class LmsPopoverPage {

  constructor(
    public viewCtrl: ViewController,
    private events: Events
  ) {
  }

  close() {
    console.log('close LmsPopoverPage');
    this.viewCtrl.dismiss();
  }

  openMyNotes(){   
    console.log('openMyNotes');
    this.events.publish('lms:show', 'LmsNotesPage')
    this.viewCtrl.dismiss();
  }

  openMyReports(){
    console.log('openMyReports');

    this.events.publish('lms:show', 'LmsReportsPage')
    this.viewCtrl.dismiss();
  }

}
