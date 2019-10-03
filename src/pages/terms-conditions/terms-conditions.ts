import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController ,IonicPage} from 'ionic-angular';
import { AuthService } from '../../app/services/auth.service'
import { ApiService } from '../../app/services/api.service'
@IonicPage()
@Component({
  selector: 'page-terms-conditions',
  templateUrl: 'terms-conditions.html',
})
export class TermsConditionsPage {

  terms: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apiService: ApiService,
    public authService: AuthService,
    public loadingCtrl: LoadingController
    ) {
      let loader = this.loadingCtrl.create({ duration: 10000 });
      loader.present().then(() => { 
        this.apiService.post(5956).subscribe(
          data => {
            console.log(data.data);
            this.terms = data.data;
            loader.dismiss();
          },
          error => {
            console.log(error);
            loader.dismiss();
          }
        )
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsConditionsPage');
  }

  backToHome(){
    this.navCtrl.popToRoot();
  }
}
