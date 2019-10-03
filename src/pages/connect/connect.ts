import { Component } from '@angular/core';
import { Events, NavController, NavParams, LoadingController, AlertController ,IonicPage} from 'ionic-angular';
import { ApiService } from '../../app/services/api.service';
import { AuthService } from '../../app/services/auth.service';
import { UserService } from '../../app/services/user.service';


@IonicPage()
@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html',
})
export class ConnectPage {

connect_form?: any;
input?: any;
ask_post?: any;
contact: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apiService: ApiService,
    public authService: AuthService,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private events: Events
    ) {
      let loader = this.loadingCtrl.create({ duration: 10000 });
      loader.present().then(() => {
        this.apiService.post(7096).subscribe(
          data => {
              console.log(data.data);
              this.ask_post = data.data.structure;
          },
          error => console.log(error)
        );
        this.apiService.postForm(37).subscribe(
          data => {
              console.log(data.data.structure);
              this.connect_form = data.data.structure;
              loader.dismiss();
          },
          error => {
            console.log(error)
            loader.dismiss();
          }
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
    console.log('ionViewDidLoad ConnectPage');
  }

  ionViewWillEnter() {
    // notify app home to check service again
    this.events.publish('app:checkservice')
  }

  optionsFn() {
    console.log(this.contact);
  }

  submitConnect() {

    // prevent form from submitting when there is no form id provided
    if (!this.connect_form) {
        let alert = this.alertCtrl.create({
            title: 'Contact Form Error',
            subTitle: '<br><small>[ERROR][APP] A401</small><br> Cannot submit now <br><br> <b>Please try to refresh the page.</b>',
            buttons: ['OK']
        });
        alert.present()
        return
    }




    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      subTitle: 'Thanks for contacting us! We will get in touch with you shortly.',
      buttons: ['Dismiss']
    });
    console.log(this.contact);
    console.log(this.input);
    console.log(this.connect_form.id);
    let data_input = [];
    data_input.push(['index_1','']);
    data_input.push(['index_7',this.contact]);

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
    
    data_input.push(['index_5','']);
    data_input.push(['index_6',this.input.message]);
    data_input.push(['index_8','']);
    let loader = this.loadingCtrl.create({ duration: 10000 });
    let apiData = {
      'user' : this.userService.userId,
      'data' : data_input
    };

    //console.log(this.input.subject == '');
    if(this.input.message && this.contact == 'Phone' && this.input.phone) {
      var re = /^[0-9-()+ ]+$/;
      console.log(re.test(String(this.input.phone).toLowerCase()));
      if(!re.test(String(this.input.phone).toLowerCase())){
        let alert = this.alertCtrl.create({
          title: 'Contact Form Error',
          subTitle: 'Please enter a valid phone number',
          buttons: ['OK']
        });
        alert.present();
      } else {
        loader.present().then(() => {
          this.apiService.postQuizResponse(this.connect_form.id,apiData).subscribe(
              data => {
                  console.log(data);
                  loader.dismiss();
                  alert.present();
                  this.navCtrl.pop();
              },
              error => {
                let alert = this.alertCtrl.create({
                    title: 'Contact Form Error',
                    subTitle: '<br>[ERROR][APP] A403<br> Fail to contact <br><br> <b>Please try again later.</b>',
                    buttons: ['OK']
                });
                alert.present()
                loader.dismiss();
                console.log(error)
              }
          );
        });
      }
    } else if(this.input.message && this.contact == 'Email' && this.input.email) {
          var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          console.log(regex.test(String(this.input.email).toLowerCase()));
          if(!regex.test(String(this.input.email).toLowerCase())){
              let alert = this.alertCtrl.create({
                  title: 'Contact Form Error',
                  subTitle: 'Please enter a valid email address',
                  buttons: ['OK']
              });
              alert.present();
          } else {
              loader.present().then(() => {
                  this.apiService.postQuizResponse(this.connect_form.id,apiData).subscribe(
                      data => {
                          console.log(data);
                          loader.dismiss();
                          alert.present();
                          this.navCtrl.pop();
                      },
                      error => {
                        let alert = this.alertCtrl.create({
                            title: 'Contact Form Error',
                            subTitle: '<br>[ERROR][APP] A402<br> Fail to contact <br><br> <b>Please try again later.</b>',
                            buttons: ['OK']
                        });
                        alert.present()
                        loader.dismiss();
                        console.log(error)
                      }
                  );
              });
          }
    } else if(!this.contact && !this.input.message){
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
        this.apiService.postQuizResponse(this.connect_form.id,apiData).subscribe(
          data => {
              console.log(data);
              loader.dismiss();
              alert.present();
              this.navCtrl.pop();
              },
          error => {
            console.log(error)
            let alert = this.alertCtrl.create({
                title: 'Contact Form Error',
                subTitle: '<br><small>[ERROR][APP] A400</small><br> Fail to contact <br><br> <b>Please try again later.</b>',
                buttons: ['OK']
            });
            alert.present()
            loader.dismiss();
          }
        );
      });
    }
  }

  bookSchedule(){
    //console.log('clicked');
    let user : any;
    user = JSON.parse(localStorage.getItem('userData'));
    let url = 'https://wellbeing.lifestreet.com.au/booking-calendar-so-app/?Email' + user.user_email + '&Name='+ user.display_name + '&Company=' + user.company;
    window.open(url,'_system', 'location=yes');
  }

}
