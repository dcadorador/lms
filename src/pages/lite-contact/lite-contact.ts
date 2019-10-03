import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ApiService } from '../../app/services/api.service';
import { UserService } from '../../app/services/user.service';


@IonicPage()
@Component({
  selector: 'page-lite-contact',
  templateUrl: 'lite-contact.html',
})
export class LiteContactPage {

  public contact: any
  private input?: any
  private connect_form?: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private apiService: ApiService,
    private userService: UserService,
    public events: Events
  ) {
      this.setContact()
      this.initApi()
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad LiteContactPage');
  }

  ionViewWillEnter() {
      // notify lite home to check service again
      this.events.publish('lite:checkservice');

      // sync fetch for lite home updates
      this.events.publish('lite:homesettings', () => {
          this.setContact()
      })
  }


  // refreshing page
  doRefresh(refresher) {

      let loader = this.loadingCtrl.create({ duration: 10000 })

      // show loader
      loader.present().then(() => {

          // notify lite home to check service again
          this.events.publish('lite:checkservice', () => {
              loader.dismiss()
          });

          // sync fetch for lite home updates
          this.events.publish('lite:homesettings', () => {
              this.setContact()
              this.initApi()
          })
      })

      refresher.complete();
  }


  // ----------------------- COMMON FUNCTIONS ---------------
  setContact() {
    // get settings
    let settings = JSON.parse(localStorage.getItem('lite_home_settings'))

    // populate contact properties
    this.contact = {
      title: settings.ask_a_question_title
    }
  }

  initApi() {
    this.input = {
      firstname: '',
      lastname: '',
      email: '',
      message: ''
    }

    // get connect form
    this.apiService.postForm(37).subscribe(
        data => {
            this.connect_form = data.data.structure;
        },
        error => console.log(error)
    );
  }


  submitContact(e) {

    // prevent form from submitting when there is no form id provided
    if (!this.connect_form) {
        let alert = this.alertCtrl.create({
            title: 'Contact Form Error',
            subTitle: '<br><small>[ERROR][LITE] L401</small><br> Cannot submit now <br><br> <b>Please try to refresh the page.</b>',
            buttons: ['OK']
        });
        alert.present()
        return
    }


    let errors = []

    // email regex
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // validate all
    if (!regex.test(String(this.input.email).toLowerCase())) {
      errors.push('*email is invalid')
    }

    if (!this.input.message || this.input.message.trim() === '') {
      errors.push('*message is empty')
    }

    if (!this.input.firstname || this.input.firstname.trim() === '') {
      errors.push('*first name is empty')
    }

    if (!this.input.lastname || this.input.lastname.trim() === '') {
      errors.push('*last name is empty')
    }


    if (errors.length > 0) {

      let alert = this.alertCtrl.create({
          title: 'Contact Form Error',
          subTitle: errors.join('<br>') + '<br><br> <b>Please try again.</b>',
          buttons: ['OK']
      });
      alert.present()


    } else {

      // create loader
      let loader = this.loadingCtrl.create({ duration: 10000 })
      // create alert 
      let alert = this.alertCtrl.create({
          title: 'Confirmation',
          subTitle: 'Thanks for contacting us! We will get in touch with you shortly.',
          buttons: ['Dismiss']
      })


      loader.present().then(() => {

          let data_input = []
          data_input.push(['index_1', this.input.firstname + ' ' + this.input.lastname]);
          data_input.push(['index_7', 'email']);
          data_input.push(['index_3',this.input.email]);
          data_input.push(['index_4','']);
          data_input.push(['index_5','']);
          data_input.push(['index_6',this.input.message]);
          data_input.push(['index_8','']);

          let apiData = {
            'user' : this.userService.userId,
            'data' : data_input
          };


          this.apiService.postQuizResponse(this.connect_form.id, apiData).subscribe(
              data => {
                  loader.dismiss()
                  alert.present()
                  this.navCtrl.pop()
              },
              error => {
                  console.error(error)
                  loader.dismiss()
                  let alert = this.alertCtrl.create({
                      title: 'Contact Form Error',
                      subTitle: '<br><small>[ERROR][LITE] L400</small><br> Fail to contact <br><br> <b>Please try again later.</b>',
                      buttons: ['OK']
                  });
                  alert.present()
              }
          );

      })
    }
  }

}
