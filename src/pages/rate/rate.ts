import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, IonicPage} from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { UserService } from '../../app/services/user.service';
import { ApiService } from '../../app/services/api.service';
@IonicPage()
@Component({
  selector: 'page-rate',
  templateUrl: 'rate.html',
})
export class RatePage {
form : any;
type : any;
home_settings : any;
rate_input: any[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public userService: UserService,
    public apiService: ApiService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
    ) {
      let loader = this.loadingCtrl.create({ duration: 10000 });
      loader.present().then(() => { 
        this.form = this.navParams.get('rate');
        this.type = this.navParams.get('type');
        this.home_settings = JSON.parse(localStorage.getItem('home_settings')).data;
        console.log(this.type);
        // console.log(this.form);
        loader.dismiss();
      });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RatePage');
  }

  rateNow(){
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      subTitle: 'Thank you.',
      buttons: ['Dismiss']
    });
    // console.log(this.form.id);
    if(this.type == 'user_webinar'){
      let user_webinar = JSON.parse(localStorage.getItem('user_webinar')).data;
      this.rate_input.push(['index_4',user_webinar.post_title]);
    } else {
      this.rate_input.push(['index_4',this.home_settings.webinar_title.post_title]);
    }
    
    let apiData = {
      'user' : this.userService.userId,
      'data' : this.rate_input
    };
    console.log(apiData);
    let loader = this.loadingCtrl.create({ duration: 10000 });
    loader.present().then(() => { 
      this.apiService.postQuizResponse(this.form.id,apiData).subscribe(
        data => {
            console.log(data);
            loader.dismiss();
            alert.present();
            this.viewCtrl.dismiss();
            },
        error => console.log(error)
      );
    });
  }

  onChoosing(choice,index){
    console.log('index_' + index + ' ' + choice);
    let idx = 'index_' + index;
    let objidx = null;
    this.rate_input.forEach(function(arr, i){
        if(arr[0] == idx || arr[1] == choice){
          objidx = i;
        }
    });
    if(objidx !== null && this.rate_input.length > 0){
      this.rate_input.splice(objidx,1);
    }
    this.rate_input.push([idx,choice]);
    console.log(this.rate_input);
  } 
}
