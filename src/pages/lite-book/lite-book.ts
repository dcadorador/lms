import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../../app/services/api.service';


@IonicPage()
@Component({
  selector: 'page-lite-book',
  templateUrl: 'lite-book.html',
})
export class LiteBookPage {

  public book?: any
  public calendarUrl: any
  private bookcountry?: any
  private loader: any
  public note: String

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sanitizer: DomSanitizer,
    public events: Events,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private apiService: ApiService,
  ) {
      this.setBooking()
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad LiteBookPage');
  }

  ionViewWillEnter() {
      // notify lite home to check service again
      this.events.publish('lite:checkservice', () => {
          this.setBooking()
          
          // sync fetch for lite home updates
          this.events.publish('lite:homesettings', () => {
              this.initBooking()
          })
      });
  }

  // refreshing page
  doRefresh(refresher) {
    // notify lite home to check service again
    this.loader = this.loadingCtrl.create({ duration: 10000 })

    // show loader
    this.loader.present().then(() => {

      this.bookcountry = null
      this.calendarUrl = null

      // check service type again
      this.events.publish('lite:checkservice', () => {
          this.hideLoader()
          this.setBooking()
          // fetch for lite home updates
          this.events.publish('lite:homesettings', () => {
              this.initBooking()
              this.hideLoader()
          })
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
        if (!bfallback || (bfallback.calendar === '' && bfallback.text === '')) {
            let alert = this.alertCtrl.create({
                title: 'Booking Error',
                subTitle: '<br><small>[ERROR][LITE] L300</small><br> It seems there are no default booking settings <br><br> <b>Please contact Life Street to discuss your options</b>',
                buttons: ['OK']
            });
            alert.present()
            this.note = 'Please contact Life Street to discuss your options.'
            return
        }

        // get booking fallback settings
        this.bookcountry = bfallback
    }

    console.log('booking setting: ', bfallback, this.bookcountry)


    // try to sets user's calendar
    this.setCalendar(user)

  }


  // sets booking settings
  setBooking() {
      this.note = ''

      // get settings
      let settings   = JSON.parse(localStorage.getItem('lite_home_settings'))


      // populate book properties
      this.book = { title: settings.book_an_appointment_title }
  }

  hideLoader() {
    if (this.loader != null) {
      this.loader.dismiss()
      this.loader = null
    }
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

}
