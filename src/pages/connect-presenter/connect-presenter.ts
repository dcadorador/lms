import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController ,IonicPage} from 'ionic-angular';
import { ApiService } from '../../app/services/api.service';
import { AuthService } from '../../app/services/auth.service';
import { UserService } from '../../app/services/user.service';

@IonicPage()
@Component({
  selector: 'page-connect-presenter',
  templateUrl: 'connect-presenter.html',
})
export class ConnectPresenterPage {

  connect_post?: any;
  connect_presenter: any;
  input?: any;
  contact: any;
  home_settings: any;
  webinar_type: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apiService: ApiService,
    public authService: AuthService,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
    ) {
      this.webinar_type = this.navParams.get('type');
      console.log(this.webinar_type);
      this.home_settings = JSON.parse(localStorage.getItem('home_settings')).data;
      let loader = this.loadingCtrl.create({ duration: 10000 });
      loader.present().then(() => {
        this.apiService.post(7056).subscribe(
          data => {
              console.log(data.data);
              this.connect_post = data.data;
          },
          error => console.log(error)
        );
        this.apiService.postForm(36).subscribe(
          data => {
              console.log(data.data.structure);
              this.connect_presenter = data.data.structure;
              loader.dismiss();
          },
          error => console.log(error)
        );
      })
      this.input = {
        subject: '',
        message: '',
        email: '',
        phone: ''
      }
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ConnectPresenterPage');
  }

  submitConnectPresenter() {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      subTitle: 'Thanks for contacting us! We will get in touch with you shortly.',
      buttons: ['Dismiss']
    });
    //console.log(this.contact);
    //console.log(this.input);
    //console.log(this.connect_presenter.id);
    let data_input = [];
    if(this.contact == 'Email'){
      data_input.push(['index_3',this.input.email]);
    } else {
      data_input.push(['index_3','']);
    }

    if(this.contact == 'Phone'){
      data_input.push(['index_4',this.input.phone]);
    } else {
      data_input.push(['index_4','']);
    }
    data_input.push(['index_1','']);
    data_input.push(['index_7',this.contact]);
    data_input.push(['index_3',this.input.email]);
    data_input.push(['index_5',this.input.subject]);
    data_input.push(['index_6',this.input.message]);
    if(this.webinar_type == 'user_webinar') {
      let user_webinar = JSON.parse(localStorage.getItem('user_webinar')).data;
      console.log(user_webinar);
      data_input.push(['index_8',user_webinar.post_title]);
    } else {
      data_input.push(['index_8',this.home_settings.webinar_title.post_title]);
    }
    

    let loader = this.loadingCtrl.create({ duration: 10000 });
    //console.log(data_input);
    let apiData = {
      'user' : this.userService.userId,
      'data' : data_input
    };

    // Updated Checker
    if(this.input.message && this.contact == 'Phone' && this.input.phone) {
      var re = /^[0-9-()+ ]+$/;
      //console.log(re.test(String(this.input.phone).toLowerCase()));
      if(!re.test(String(this.input.phone).toLowerCase())){
        let alert = this.alertCtrl.create({
          title: 'Contact Form Error',
          subTitle: 'Please enter a valid phone number',
          buttons: ['OK']
        });
        alert.present();
      } else {
        loader.present().then(() => {
          this.apiService.postQuizResponse(this.connect_presenter.id,apiData).subscribe(
            data => {
                // console.log(data);
                loader.dismiss();
                alert.present();
                this.navCtrl.pop();
                },
            error => console.log(error)
          );
        });
      }
    }
    else if(this.input.message && this.contact == 'Email' && this.input.email) {
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      //console.log(regex.test(String(this.input.email).toLowerCase()));
      if(!regex.test(String(this.input.email).toLowerCase())){
        let alert = this.alertCtrl.create({
          title: 'Contact Form Error',
          subTitle: 'Please enter a valid email address',
          buttons: ['OK']
        });
        alert.present();
      } else {
        loader.present().then(() => {
          this.apiService.postQuizResponse(this.connect_presenter.id,apiData).subscribe(
            data => {
                console.log(data);
                loader.dismiss();
                alert.present();
                this.navCtrl.pop();
                },
            error => console.log(error)
          );
        });
      }
    }else if(!this.contact && !this.input.message){
      let alert = this.alertCtrl.create({
        title: 'Contact Form Error',
        subTitle: 'Please fill out form',
        buttons: ['OK']
      });
      alert.present();
    } else if(this.input.message && !this.contact) {
      let alert = this.alertCtrl.create({
        title: 'Contact Form Error',
        subTitle: 'Please choose how you would like to be contacted',
        buttons: ['OK']
      });
      alert.present();
    } else if(!this.input.message && this.contact == 'Email' && !this.input.email) {
      let alert = this.alertCtrl.create({
        title: 'Contact Form Error',
        subTitle: 'Email and Message required',
        buttons: ['OK']
      });
      alert.present();
    } else if (this.input.message  && this.contact == 'Email' && !this.input.email) {
      let alert = this.alertCtrl.create({
        title: 'Contact Form Error',
        subTitle: 'Email required',
        buttons: ['OK']
      });
      alert.present();
    } else if (!this.input.message && this.contact == 'Phone' && !this.input.phone) {
      let alert = this.alertCtrl.create({
        title: 'Contact Form Error',
        subTitle: 'Phone and Message required',
        buttons: ['OK']
      });
      alert.present();
    } else if (this.input.message  && this.contact == 'Phone' && !this.input.phone) {
      let alert = this.alertCtrl.create({
        title: 'Contact Form Error',
        subTitle: 'Phone required',
        buttons: ['OK']
      });
      alert.present();
    } else if (!this.input.message && this.contact == 'Phone' && this.input.phone) {
      let alert = this.alertCtrl.create({
        title: 'Contact Form Error',
        subTitle: 'Message required',
        buttons: ['OK']
      });
      alert.present();
    } else if (!this.input.message && this.contact == 'Email' && this.input.email) {
      let alert = this.alertCtrl.create({
        title: 'Contact Form Error',
        subTitle: 'Message required',
        buttons: ['OK']
      });
      alert.present();
    } else {
      loader.present().then(() => {
        this.apiService.postQuizResponse(this.connect_presenter.id,apiData).subscribe(
          data => {
              console.log(data);
              loader.dismiss();
              alert.present();
              this.navCtrl.pop();
              },
          error => console.log(error)
        );
      });
    }
  }
}
