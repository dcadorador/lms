import { Component } from '@angular/core';
import { Events, Platform, IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { ApiService } from '../../app/services/api.service';
import { AuthService } from '../../app/services/auth.service';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { Subscription } from 'rxjs';


@IonicPage()
@Component({
  selector: 'page-lite-home',
  templateUrl: 'lite-home.html',
})
export class LiteHomePage {

  private onResumeSubscription: Subscription;

  // list home page properties
  public isLoading: boolean = true
  private loader: any
  public settings?: any
  public user_wb_minute: boolean = false
  private wb_minute: any = null
  private loaderTimeout: any = null;


  // constructor settings
  constructor(
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    public navParams: NavParams,
    private apiService: ApiService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private platform: Platform,
    private events: Events
  ) {

    console.log('litehome constructor')
    // listen to on resume
    this.onResumeSubscription = this.platform.resume.subscribe(() => {
        // do something meaningful when the app is put in the foreground
        this.initApi()
    });


    // listen to event from other pages
    this.events.subscribe('lite:checkservice', (cb) => {
        // checks service and update other info
        this
          .checkService()
          .then(()=> {
              if (typeof cb !== 'undefined') { cb() }
          })

          .catch(()=>{
              if (typeof cb !== 'undefined') { cb() }
          })
    })

    this.events.subscribe('lite:homesettings', (cb) => {
        // checks home settings info
        this.getHomeSettings(cb)
    })
  }


  ngOnInit() {
    this.initApi()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LiteHomePage')
  }

  // refreshing page
  doRefresh(refresher) {
    this.initApi()
    refresher.complete();
  }


  // called when destroy view
  ngOnDestroy() {
    console.log('litehome onDestroy')
    this.hideLoader()

    // always unsubscribe your subscriptions to prevent leaks
    this.onResumeSubscription.unsubscribe();
    this.events.unsubscribe('lite:checkservice')
    this.events.unsubscribe('lite:homesettings')
  }



  // --------------- COMMON FUNCTIONS ---------------------



  // go to a specific page
  goto(page) {
    switch (page) {
        case 'eap': 
            this.navCtrl.push('LiteEapPage')
            break;
        case 'about': 
            this.navCtrl.push('LiteAboutPage')
            break;
        case 'book': 
            this.navCtrl.push('LiteBookPage')
            break;
        case 'contact': 
            this.navCtrl.push('LiteContactPage')
            break;
        case 'minute':

            if (!this.user_wb_minute ) {
              let alert = this.alertCtrl.create({
                  title: 'Error',
                  subTitle: "<br><small>[ERROR][APP] A500</small><br> Invalid Wellbeing Data</b>",
                  buttons: ['OK']
              });
              alert.present()
              return
            }

            this.navCtrl.push('WellbeingMinutePage', {
              wb_minute: this.wb_minute
            })
    }

  }


  // initializing api
  initApi() {


    // check for minute

    this.loader = this.loadingCtrl.create()

    // show loader
    this.loader.present().then(() => {

        // now check company info if service still lite
        this.checkService()
            // success
            .then(() => {
                this.getHomeSettings()
            })

            // catch errors do nothing
            .catch(() => {
                this.settings = JSON.parse(localStorage.getItem('lite_home_settings'))
                this.hideLoader()
            })
    })

    // add expiration for loader | note : do not use 'duration' may cause error
    this.loaderTimeout = setTimeout(() => {
      this.hideLoader()
    }, 10000)

  }


  getHomeSettings(cb?:any) {
    // fetch api data for lite home setting
    this
      .apiService
      .liteHomeSettings()
      .subscribe(
          ({data}) => {
              this.hideLoader()
              this.settings = data
              console.log('fetched litehome setting')
              localStorage.setItem('lite_home_settings', JSON.stringify(data))

              if (typeof cb !== 'undefined') {
                cb()
              }
          },

          error => {
              console.error('[ERROR][HOME] 2 : ', error)
              this.hideLoader()
              // let alert = this.alertCtrl.create({
              //     title: 'Internal Server Error',
              //     subTitle: '[ERROR][HOME] 2 : Please try again.',
              //     buttons: ['OK']
              // });
              // alert.present()
          }
      )
  }


  // this function serve as check the company service type
  // this will also update booking settings
  checkService() {
    return new Promise((res, err) => {
        let compid = localStorage.getItem('compId')
        if (!compid) {
          this.apiService
          .getCompanyId().then(() => {
              // check the lite version again
              err()

              // redirect back to standard page
              this.events.publish('app:changeroot', HomePage)
          })

          // something went wrong
          .catch(error => {
              let alert = this.alertCtrl.create({
                  title: 'Internal Server Error',
                  subTitle: "<br><small>[ERROR][LITE] L002</small><br>There's a problem fetching the service type. <br><br> <b>Please try again later.</b>",
                  buttons: ['OK']
              });
              alert.present()
              // dismiss loader
              this.hideLoader()

          })

          return
        }

        // if company id == null
        if (compid == 'null') {
          let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: "<br><small>[ERROR][LITE] L003</small><br>Invalid company ID. <br><br> <b>You must need to re-login.</b>",
              buttons: [{
                text: 'OK',
                handler: () => {
                  err()
                  this.authService.logOut().subscribe(
                    data => {
                      this.events.publish('app:changeroot', LoginPage);
                      this.hideLoader()
                    },
                    error => {
                      console.log(error)
                      this.events.publish('app:changeroot', LoginPage);
                      this.hideLoader()
                    }
                  );
                }
              }]
            })
          alert.present()
          return
        }

        // check for any updates in the server
        this
          .apiService
          .loadPost()
          .info(compid)

          // success
          .then(data => {

              // validate company service type
              if (!localStorage.getItem('company_service') || localStorage.getItem('company_service') !== 'lite')  {
                // hides loader
                this.hideLoader()

                // publish an event for service changed
                this.events.publish('service:changed');

                // redirect back to standard page
                // this.events.publish('app:changeroot', HomePage)
                this.events.publish('app:changeroot', HomePage);

                // stops from initializing api again
                return err()
              }

              res(data)
          })

          // catch any errors
          .catch(error => {
              this.settings = JSON.parse(localStorage.getItem('lite_home_settings'))
              this.hideLoader()


              var eTitle = ""
              var eMessage = ""
              var buttons = []

              if (error.status == 500) {
                eTitle = "Error"
                eMessage = "<br><small>[ERROR][LITE] L004</small><br> The company ID does not exist. <br><br><b>You must need to re-login.</b>"
                buttons.push({
                  text: 'OK',
                  handler: () => {
                    this.authService.logOut().subscribe(

                      data => {
                          this.events.publish('app:changeroot', LoginPage)
                      },

                      error => {
                          console.log(error)
                          this.events.publish('app:changeroot', LoginPage)
                      }
                    );
                  }
                })
              } else if (error.status == 0) {
                eTitle = 'Connection Error'
                eMessage = "<br><small>[ERROR][LITE] L001</small><br> It looks like you don't have an internet connection.<br><br> <b>Please try again later.</b>"
                buttons.push("OK")
              } else {
                eTitle = 'Error'
                eMessage = "<br><small>[ERROR][LITE] L000</small><br> " + error._body
                buttons.push("OK")
              }

              let alert = this.alertCtrl.create({
                  title: eTitle,
                  subTitle: eMessage,
                  buttons: buttons
              });
              alert.present()
              err(error)
          })
    })
  }


  // hides loading
  hideLoader() {
    this.isLoading = false

    if (this.loader != null) {
      this.loader.dismiss()
      this.loader = null
    }


    if (this.loaderTimeout) {
      clearTimeout(this.loaderTimeout)
      this.loaderTimeout = null
    }
  }

}
