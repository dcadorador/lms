import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-lite-eap',
  templateUrl: 'lite-eap.html'
})
export class LiteEapPage {

  public eap?: any
  private loader: any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    private loadingCtrl: LoadingController
  ) {
      this.setEap()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LiteEapPage')
  }

  ionViewWillEnter() {
    // notify lite home to check service again
    this.events.publish('lite:checkservice')

    // fetch for lite home updates
    this.events.publish('lite:homesettings', () => {
        this.setEap()
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
            this.setEap()
        })
    })

    refresher.complete()
  }


  // ----------------------- EAP COMMON FUNCTIONS ---------------------


  setEap() {
    // get settings
    let settings = JSON.parse(localStorage.getItem('lite_home_settings'))

    // populate eap properties
    this.eap = {
      content: settings.eap_content,
      image: settings.eap_image,
      title: settings.eap_title
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
