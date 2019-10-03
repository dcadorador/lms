import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController ,IonicPage} from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { UserService } from '../../app/services/user.service';
import { ApiService } from '../../app/services/api.service';


@IonicPage()
@Component({
  selector: 'page-webinar-modal',
  templateUrl: 'webinar-modal.html',
})
export class WebinarModalPage {
  form: any;
  input: any[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public userService: UserService,
    public apiService: ApiService,
    public loadingCtrl: LoadingController
  ) {
    this.form = this.navParams.get('form');
    console.log(this.form);
    console.log(this.userService.userId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WebinarModalPage');
  }

  public closeModal(){
    //console.log(JSON.stringify(this.input));
    let loader = this.loadingCtrl.create({ duration: 10000 });
    loader.present().then(() => {
        this.apiService.postFormResponse(this.form.id, { 'user': this.userService.userId , 'data' : this.input }).subscribe(
          data => console.log(data),
          error => console.log(error)
        );
        this.userService.userWebinarFormAssessed(true);
        this.navCtrl.pop();
        loader.dismiss();
     });
  }

  onChange(choice,index){
    console.log(choice + ' ' + index);
    this.input.push(choice);
  }
}
