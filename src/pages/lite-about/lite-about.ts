import { Component } from '@angular/core';
import { Events, NavController, NavParams, LoadingController, IonicPage } from 'ionic-angular';

/**
 * Generated class for the LiteAboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lite-about',
  templateUrl: 'lite-about.html',
})
export class LiteAboutPage {

  public about?: any
  private loader: any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    private loadingCtrl: LoadingController
  ) {
      this.setAbout()

  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad LiteAboutPage');
  }

  ionViewWillEnter() {
      // notify lite home to check service again
      this.events.publish('lite:checkservice');

      // fetch for lite home updates
      this.events.publish('lite:homesettings', () => {
          this.setAbout()
      })
  }


  // refreshing page
  doRefresh(refresher) {
    // notify lite home to check service again
    this.loader = this.loadingCtrl.create({ duration: 10000 })

    // show loader
    this.loader.present().then(() => {
        // check service type again
        this.events.publish('lite:checkservice', () => {
            this.hideLoader()
        })
        // fetch for lite home updates
        this.events.publish('lite:homesettings', () => {
            this.setAbout()
        })
    })

    refresher.complete()
  }


  // ----------------------- ABOUT COMMON FUNCTIONS ---------------------

  setAbout() {
    // get settings
    let settings = JSON.parse(localStorage.getItem('lite_home_settings'))

    // populate about properties
    this.about = {
      title: settings.about_your_eap_title,
      line_above: settings.your_eap_content_above_line,
      line_below: settings.your_eap_content_below_line
    }


    this.hideLoader()
  }

  hideLoader() {
    if (this.loader != null) {
      this.loader.dismiss()
      this.loader = null
    }
  }

}
