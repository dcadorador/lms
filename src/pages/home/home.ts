import { Component } from '@angular/core';
import { Events, Platform, NavController, AlertController} from 'ionic-angular';
import { ApiService } from '../../app/services/api.service';
import { LoadingController } from 'ionic-angular';
import { AuthService } from '../../app/services/auth.service';
import { LoginPage } from '../login/login';
import { Subscription } from 'rxjs';
import {  PushNotificationProvider } from '../../providers/push-notification/push-notification';
import { STATUS_COMPLETED } from '../wellbeing-minute/constants'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private onResumeSubscription: Subscription;

  article: any = null;
  webinar: any = null;
  tool: any = null;
  video: any = null;
  trending: any = null;
  id: any = null;
  user_article: any = {};
  user_webinar: any = {};
  user_tool: any = {};
  user_trending: any = {};
  home_settings: any = null;
  user_trending_last_update: any = null;
  trending_updated_date: any = null;
  user_wb_minute:boolean = false;
  check_user_trending: boolean = false;
  is_loading: boolean = true;
  loader: any = null;
  loaderTimeout: any = null;
  check_user_wb_minute: any =null;
  public show_wb_minute_user: Array<{id:string,post_content:string,post_title:string}>;
  lms_invited: boolean = false;
  lms_started: boolean = false;
  lms_status: any = null;
  lms_title: any=null;
  lms_module_title: any=null;
  lms_schedule: any=null;
  lms_course_id: any=null;
  

  constructor(
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private apiService: ApiService,
    public authService: AuthService,
    private platform: Platform,
    private events: Events,
    private alertCtrl: AlertController,
    private pushNotif : PushNotificationProvider
  ) {

    console.log('home construct')
    this.id = localStorage.getItem('userID');  
    // this.apiService.clearCache();
    this.initApi()
    this.show_wb_minute_user= [];

    // listen to event from other pages
    this.events.subscribe('app:checkservice', (cb) => {
        // checks service and update other info
        this.checkLiteVersion(cb)
    })

    // listen to event that checks for minute
    this.events.subscribe('app:checkminute', () => {
        this.checkMinute()
    })

    // listen to event that checks for lms
    this.events.subscribe('app:checklms', () => {
      this.checkLMS()
    })
  }

  ionViewDidEnter() {
    console.log('did enter')
    this.onResumeSubscription = this.platform.resume.subscribe(() => {
       // do something meaningful when the app is put in the foreground
       this.initApi();   
    });
  }

  ionViewDidLoad(){
    // stop when still not set
    if (
        localStorage.getItem('user_trending_check') == null ||
        localStorage.getItem('user_trending') == null ||
        localStorage.getItem('user_webinar') == null ||
        localStorage.getItem('user_tool') == null ||
        localStorage.getItem('home_settings') == null
    ) {
        return;
    }
    
    this.check_user_trending = JSON.parse(localStorage.getItem('user_trending_check'));
 
    if (this.check_user_trending) {
        this.user_trending = JSON.parse(localStorage.getItem('user_trending')).data;
        this.user_webinar = JSON.parse(localStorage.getItem('user_webinar')).data;
        this.user_tool = JSON.parse(localStorage.getItem('user_tool')).data;
    }

    this.home_settings = JSON.parse(localStorage.getItem('home_settings')).data
  }

  ionViewDidLeave() {
    console.log('leaving from view')
    this.hideLoader();
    this.onResumeSubscription.unsubscribe();
  }

  // called when destroy view
  ngOnDestroy() {
    this.hideLoader()

    console.log('on destroy')

    // always unsubscribe your subscriptions to prevent leaks
    this.events.unsubscribe('app:checkservice')
    this.events.unsubscribe('app:checkminute')
    this.events.unsubscribe('app:checklms')
  }

  contact(){
    this.navCtrl.push('ConnectPage');
  }

  scheduleSession(){
    this.navCtrl.push('BookingPage');
  }

  cardAction(data){
    if (data === null) {
        console.error('no data provided')
        return
    }

    console.log('data.post_type',data.post_type);
    switch(data.post_type) {
        case 'webinar':
          this.navCtrl.push('WebinarPage',{
            webinar: data
          });
          break;
        case 'tool':
          //console.log(data);
          this.navCtrl.push('ToolPage',{
            tool: data
          });
          break; 
        case 'user_webinar':
          console.log(data);
          this.navCtrl.push('WebinarPage',{
            webinar: data
          });
          break;
        case 'user_tool':
          console.log(data);
          this.navCtrl.push('ToolPage',{
            tool: data
          });
          break;

    }
  }

  doRefresh(refresher) {

      this.initApi();
      refresher.complete();
  }

  iniClean() {
        // clean storage first
        localStorage.removeItem('tool');
        localStorage.removeItem('trending');
        localStorage.removeItem('webinar');
        localStorage.removeItem('home_settings');
        localStorage.removeItem('user_webinar');
        localStorage.removeItem('user_trending');
        localStorage.removeItem('user_trending_check');
        localStorage.removeItem('user_tool');


        this.tool = null;
        this.trending = null;
        this.webinar = null;
        this.home_settings = null;
        this.user_webinar = null;
        this.user_trending = null;
        this.check_user_trending = null;
        this.user_tool = null;
  }


  initApi() {

    // stops initialization when its in progress
    if (this.loader) {
      return
    }

    this.is_loading = true

    // create loader
    this.loader = this.loadingCtrl.create();

    // show loader
    this.loader.present().then((res) => {

        this.checkMinute()
        this.checkLMS()

        // check version first before proceeding
        this.checkLiteVersion(() => {

            // flow of api request
            // 1. user apis
            // 1.1 home home settings
            // 1.2 user trending posts
            // 1.3 user trending posts webinar
            // 1.4 user tools
            // 1.5 user trending updated

            // 2. api services
            // 2.1 trending posts webinar
            // 2.3 trending posts tools


            console.log('api 1')
            // this.iniClean()
    

            if (!localStorage.getItem('userID'))
               return
            


            // prepare to load user
            let loadUser = this.apiService.loadUserContent(localStorage.getItem('userID'))

            console.log('api 2')
            this.is_loading = false

            // load user apis
            loadUser.then(() => {

                // stops process when user id is empty
                if (!localStorage.getItem('userID'))
                  return

                // populate trending post, webinar, tools
                let trendings = this.apiService.loadPost();
                trendings.trendingPost().then(({data}) => this.trending = data)
                trendings.trendingWebinar().then(({data}) => this.webinar = data)
                trendings.trendingTool().then(({data}) => this.tool = data)
                

                // update home settings
                this.home_settings = JSON.parse(localStorage.getItem('home_settings')).data
                console.log('api 3')

                // fetch user trending check
                this.apiService.userTrendingCheck(localStorage.getItem('userID')).then(
                    res => {
                        // stops process when user id is empty
                        if (!localStorage.getItem('userID'))
                          return
                        console.log('api 4')
                        this.check_user_trending = JSON.parse(res.status);
                        localStorage.setItem('user_trending_check', res.status);

                        if (this.check_user_trending) {
                          this.user_trending = JSON.parse(localStorage.getItem('user_trending')).data;
                          this.user_webinar = JSON.parse(localStorage.getItem('user_webinar')).data;
                          this.user_tool = JSON.parse(localStorage.getItem('user_tool')).data;
                        }
                        this.hideLoader()
                    },
                    err => {
                        this.hideLoader()
                        console.log(err);
                    }
                )


                // fetch for trending updates
                this.apiService.trendingUpdated().subscribe(
                    data => {
                        // stops process when user id is empty
                        if (!localStorage.getItem('userID'))
                          return
                        console.log('api 5')
                        // update trending update date
                        this.trending_updated_date = data.data.trending_updated_date;

                        if(JSON.parse(localStorage.getItem('trending_last_update')) != this.trending_updated_date) {
                            localStorage.setItem('trending_last_update',JSON.stringify(this.trending_updated_date));
                        }
                    },
                    error => console.log(error)
                );
            })

        })
    });

    // add expiration for loader | note : do not use 'duration' may cause error
    this.loaderTimeout = setTimeout(() => {
      this.hideLoader()
    }, 10000)
  }

  wellbeingView(){
    if (!this.check_user_wb_minute || !this.check_user_wb_minute.data) {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: "<br><small>[ERROR][APP] A500</small><br> Invalid Wellbeing Data</b>",
            buttons: ['OK']
        });
        alert.present()
        return
    }

    this.navCtrl.push('WellbeingMinutePage',{wb_minute:this.show_wb_minute_user[0]});
  }


  checkLiteVersion(callback?: any) {

    // checks if compid is available [IMPORTANT]
    let compid = localStorage.getItem('compId')
    if (!compid) {

        console.log('company id is not available')
        // fetch company id
        this.apiService
          .getCompanyId().then(() => {
              // check the lite version again
              this.checkLiteVersion(callback)
          })

          // something went wrong
          .catch(error => {
              let alert = this.alertCtrl.create({
                  title: 'Internal Server Error',
                  subTitle: "<br><small>[ERROR][APP] A002</small><br>There's a problem fetching the service type. <br><br> <b>Please try again later.</b>",
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
          subTitle: "<br><small>[ERROR][LITE] L003</small><br>Invalid company ID. <br><br> <b>Your must need to re-login.</b>",
          buttons: [{
            text: 'OK',
            handler: () => {
              this.authService.logOut().subscribe(
                data => {
                  this.events.publish('app:changeroot', LoginPage);
                  this.loader.dismiss()
                },
                error => {
                  console.log(error)
                  this.events.publish('app:changeroot', LoginPage);
                  this.loader.dismiss()
                }
              );
            }
          }]
        })
      alert.present()
      return
    }



    // check for any updates in the server
    this.apiService
        .loadPost()
        .info(compid)
        // success
        .then(data => {

            console.log('company service : ', localStorage.getItem('company_service'))
            // validate company service type
            if (localStorage.getItem('company_service') && localStorage.getItem('company_service') === 'lite')  {
              // dismiss loader first
              this.hideLoader()

              // publish an event for service changed
              this.events.publish('service:changed');

              // redirect to lite version
              this.events.publish('app:changeroot', 'LiteHomePage');

            } else if (typeof callback !== 'undefined') {
              // proceed to load apis
              callback()
            }
        })

        // catch any errors
        .catch(error => {
            console.error('error : ', error)

            var eTitle = ""
            var eMessage = ""
            var buttons = []

            // error 500
            if (error.status == 500) {
              eTitle = "Error"
              eMessage = "<br><small>[ERROR][APP] A004</small><br> The company ID does not exist. <br><br><b>You must need to re-login.</b>"
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
            // error no connection
            } else if (error.status === 0) {
              eTitle = 'Connection Error'
              eMessage = "<br><small>[ERROR][APP] A001</small><br> It looks like you don't have an internet connection. <br><br> <b>Please try again.</b>"
              buttons.push("OK")
            // setback error
            } else {
              eTitle = 'Error'
              eMessage = eMessage = "<br><small>[ERROR][APP] A005</small><br> " + JSON.parse(error._body).message
              buttons.push("OK")
            }
            let alert = this.alertCtrl.create({
                title: eTitle,
                subTitle: eMessage,
                buttons: buttons
            });
            alert.present()
            // dismiss loader first
            this.hideLoader()


            let lsSetting = localStorage.getItem('home_settings')
            let lsTrending = localStorage.getItem('trending')
            let lsWebinar = localStorage.getItem('webinar')
            let lsTool = localStorage.getItem('tool')

            // populate data
            if (lsSetting) {
                this.home_settings = JSON.parse(lsSetting).data
            }
            if (lsTrending) {
                this.trending = JSON.parse(lsTrending).data
            }
            if (lsWebinar) {
                this.webinar = JSON.parse(lsWebinar).data
            }
            if (lsTool) {
                this.tool = JSON.parse(lsTool).data
            }
        })        
  }

  checkMinute() {
    this.check_user_wb_minute = null
    this.user_wb_minute = false
    this.show_wb_minute_user = []

    //wb_minute_check current user and expiry 
    this.apiService.getUserWbMinute(this.id).subscribe((data)=>{      
      // validate data to avoid errors when wellbeing minute is not available
      if (!data.data) {
        this.pushNotif.isUser = "no"
        this.pushNotif.triggerNotification("no", this.id)
        return
      }
      this.check_user_wb_minute = data
      
      // trigger notification
      this.pushNotif.postID = data.data.ID
      this.pushNotif.isComplete = data.data.status
 
      if (data.data.status == STATUS_COMPLETED) {
        this.pushNotif.isUser = "no"
      } else if (this.pushNotif.postID != null && data.data.status != STATUS_COMPLETED) {
        this.pushNotif.isUser = "yes"
      }
      
      this.pushNotif.triggerNotification(this.pushNotif.isUser, this.id);

      if (
        this.check_user_wb_minute.data.post_expired == false &&
        this.check_user_wb_minute.data.status != STATUS_COMPLETED
      ){
        
        this.user_wb_minute = true
   

        this.show_wb_minute_user.push({
            id: this.check_user_wb_minute.data.ID,
            post_content: this.check_user_wb_minute.data.post_content,
            post_title: this.check_user_wb_minute.data.post_title
        });
      }   
    });
  }


  checkLMS() {
    this.lms_title = ""
    this.apiService.getInvitationLMS().subscribe(
      data => {
        this.lms_invited = data.invited
        this.lms_started = data.started
        this.lms_status = data.status
        this.lms_title = data.title
        this.lms_module_title = data.module_title
        this.lms_schedule = data.schedule
        this.lms_course_id = data.id
      },

      error => {
        console.log('lms invitation error : ', error);
        if (error.data && error.data.code === 'lms_no_user') {
          // then it needs to relogin again.
          let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: "<br><small>[ERROR][APP] A300</small><br> Token expired you need to relogin again.</b>",
              buttons: [{
                text: 'OK',
                handler: () => {
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
        }
      }
    );
  }

  hideLoader() {

    if (this.loader != null) {
      this.loader.dismissAll();
      this.loader = null

      // show content
      setTimeout(() => {
        this.is_loading = false
      }, 500)
    }

    if (this.loaderTimeout) {
      clearTimeout(this.loaderTimeout)
      this.loaderTimeout = null
    }
  }

  lmsView() {
    // must save to local storage
    localStorage.setItem('lms_course_id', this.lms_course_id)
    localStorage.setItem('lms_title', this.lms_title)
    this.events.publish('lms:next', '');
  }

  lmsAccept() {
    // just to hide buttons
    this.lms_status = 'accepted'
    this.lms_invited = false

    // must save to local storage
    localStorage.setItem('lms_course_id', this.lms_course_id)
    localStorage.setItem('lms_title', this.lms_title)

    // create loader
    this.loader = this.loadingCtrl.create();

    // show loader
    this.loader.present().then(() => {
      this.apiService.acceptInvitationLMS().subscribe(
        data => {
          this.hideLoader()
          this.events.publish('lms:next', {
            callback: () => { 
              this.lms_status = 'Started'
            }
          });
        },
        error => console.log('error lms accept', error)
      )
    })
  }

  lmsDecline(){
    // just to hide buttons
    this.lms_status = 'decline'
    this.apiService.declineInvitationLMS().subscribe(
      data => console.log('success lms decline'),
      error => console.log('error lms decline', error)
    )
  }
}
