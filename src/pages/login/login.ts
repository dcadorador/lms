import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AuthService } from '../../app/services/auth.service'
import { ApiService } from '../../app/services/api.service'
import { LoadingController, Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LiteHomePage } from '../lite-home/lite-home';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username = '';
  password = '';
  date: any;
  user_id ='';

  constructor(
    private events: Events,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private apiService: ApiService
  ) {
    this.date = new Date();
    // this.apiService.load();
    this.apiService.trendingUpdated().subscribe(
      data => {
        localStorage.setItem('trending_last_update',JSON.stringify(data.data.trending_updated_date));
      },
      error => console.log(error)
    );
  }

  showAlert(username,password) {
    var message = null;
    if(username === '' && password) {
      message = 'Username is required';
    } else if (username && password === '') {
      message = 'Password is required';
    } else {
      message = 'Username/Password is required';
    }
    const alert = this.alertCtrl.create({
      title: 'Login Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  showloginError(error) {
    const alert = this.alertCtrl.create({
      title: 'Login Error',
      subTitle: "<br><small>[ERROR][APP] A000</small><br>" + error + "<br><br> <b>Please try again later.</b>",
      buttons: ['OK']
    });
    alert.present();
  }

  login(){
    if(this.username == '' || this.password == '') {
      this.showAlert(this.username,this.password);
      return;
    }

    let loader = this.loadingCtrl.create({
      content: "Logging in...",
      duration: 10000
    });

    loader.present().then(() => {
      console.log('loader');
        this.authService.authenticate(this.username,this.password)
        .subscribe(
          data => {
                
                // side page username data               
                localStorage.setItem('username',this.username);
                
                //push notification user id
                this.user_id =data.data.ID;
           
                // check for service
                this.apiService
                    .loadPost()
                    .info(data.data.company_id)
                    .then(() => {
                        // publish an event for the side name
                        this.events.publish('user:login',this.username,Date.now());

                        //publish an event for push notification
                        this.events.publish('user:ID',this.user_id);

                        let isLite = localStorage.getItem('company_service') && localStorage.getItem('company_service') === 'lite'
                        
                        // move to the home page
                        let root = (isLite ? LiteHomePage :  HomePage);
                        this.events.publish('app:changeroot', root);

                        // dismiss the loader
                        loader.dismiss();
                    })

                    .catch(err => {
                        // this may happen in old version
                        this.events.publish('app:changeroot', HomePage);
                        // dismiss the loader
                        loader.dismiss();
                    })
          },
          error => {
            console.log('login error', error)
              if (error.status == 0) {
                this.showloginError("It looks like you don't have an internet connection.");
              } else if (error.data) {
                console.log(error.data.message);
                this.showloginError(error.data.message);
              } else {
                this.showloginError("Internal Server Error");
              }

              loader.dismiss();
          }
        );
    })
  }

  launchSite(){
    let url = "https://www.lifestreet.com.au/privacy-policy";
    window.open(url,'_system', 'location=yes');
  }

  forgotPassword(){
    let url = 'https://wellbeing.lifestreet.com.au/forgot-password/';
    window.open(url,'_system', 'location=yes');
  }
}
