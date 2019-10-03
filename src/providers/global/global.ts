import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular';

@Injectable()
export class GlobalProvider {

  public logo: any = null;
  public is_loading: boolean = true;
  public loader: any = null;
  public button_text: any = null;
  public Form: FormGroup;
  public data: any;
  public id: any =null;
  public lms_module_title: any = null;
  public lms_progress: any = null;

  constructor(public alertCtrl: AlertController) {
    console.log('Hello GlobalProvider Provider');
    this.logo ="assets/images/lifestreet_lms_logo.png";
  }

  // checks the difference between two arrays
  checkDiff(first, second) {
    for (var i=0; i<second.length; i++) {
        var index = undefined;
        while ((index = first.indexOf(second[i])) !== -1) {
            first.splice(index, 1);
        }
    }
    return first;
  }

  showAlert(title, message, ok = null) {

    // validate message
    if (!message || message == '')
      return


    let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: [{ text: 'OK', handler: ok }]
    })
    alert.present()
  }

}
