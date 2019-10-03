import { Component } from '@angular/core';
import { Events, NavController, NavParams, AlertController, LoadingController ,IonicPage} from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../../app/services/api.service';

/**
 * Generated class for the BookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {
  home_settings: any;
  user: any;
  sanitized_url: any

  public book?: any
  public calendarUrl: any
  private bookcountry?: any
  private loader: any
  public note: String = ''
  

  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public sanitizer: DomSanitizer,
              private events: Events,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private apiService: ApiService,
  )  {
    this.home_settings = JSON.parse(localStorage.getItem('home_settings')).data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
    this.bookcountry = null
    this.calendarUrl = null

    // notify app home to check service again
    this.events.publish('app:checkservice', () => {
      this.initBooking()
    })
  }

  initBooking() {
    let userId = localStorage.getItem('userID')
    this
      .apiService
      .homeSettings(userId)
      .subscribe(
        res => {
          let cc = null;
          if (res.data && res.data.user_data) {
            cc = res.data.user_data.user_country_code
          }

          this.setIframe(cc)
        }, error => {
          console.log('error on check homesettings')
        }
      )
  }


  // sets and prepare iframe
  setIframe(country_code) {

    let bcountries = JSON.parse(localStorage.getItem('book_countries_setting'))
    let bfallback  = JSON.parse(localStorage.getItem('book_fallback_setting'))
    let user       = JSON.parse(localStorage.getItem('userData'))
    let cc         = country_code ? country_code : user.profile.user_country_code

    // determine country of the user for book setting
    bcountries.forEach(bc => {

        // check each country
        if (bc.country === cc) {
            // set book country setting
            this.bookcountry = bc
        }
    })

    // if user's country does not match any company's booking country
    if (
      typeof this.bookcountry === 'undefined' || this.bookcountry === null
    ) {

        // validate fallback settings
        if (bfallback.calendar === '' && bfallback.text === '') {
            let alert = this.alertCtrl.create({
                title: 'Booking Error',
                subTitle: '<br> It seems there are no default booking settings <br><br> <b>Please contact Life Street to discuss your options</b>',
                buttons: ['OK']
            });
            alert.present()
            this.note = 'Please contact Life Street to discuss your options.'
            return
        }

        // get booking fallback settings
        this.bookcountry = bfallback
    }


    // try to sets user's calendar
    this.setCalendar(user)

  }

  // refreshing page
  doRefresh(refresher) {
    // notify lite home to check service again
    this.loader = this.loadingCtrl.create({ duration: 10000 })

    // show loader
    this.loader.present().then(() => {

      this.bookcountry = null
      this.calendarUrl = null
      this.note = ''

      // fetch for home updates
      this.events.publish('app:checkservice', () => {
          this.initBooking()
          this.hideLoader()
      })
    })

    refresher.complete()
  }


  // ----------------------- PRIVATE FUNCTIONS ----------------

  // sets calendar customize info
  setCalendar(user) {

      // checks if method is calendar
      if (this.bookcountry.method === 'calendar' && this.bookcountry.calendar !== '') {

          // prepare calendar url
          let url = this.bookcountry.calendar + '&email=' + user.user_email 
                  + '&firstName=' + user.firstname 
                  + '&lastName=' + user.lastname
                  + '&field:5967886=' + user.company
                  + '&phone=' + user.phone
                  + '&field:6118884=' + 'APP'
                  + '&field:5967889=' + user.unit;

          this.calendarUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      }
  }

  hideLoader() {
    if (this.loader != null) {
      this.loader.dismiss()
      this.loader = null
    }
  }

}
