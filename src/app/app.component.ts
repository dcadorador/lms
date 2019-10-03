import { Component , ViewChild} from '@angular/core';
import { Platform, App, AlertController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../app/services/auth.service';
import { ApiService } from '../app/services/api.service';
import { LoadingController,Events } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AppVersion } from '@ionic-native/app-version';
import { Subscription } from 'rxjs';
import {  PushNotificationProvider } from '../providers/push-notification/push-notification';
import { GlobalProvider } from '../providers/global/global';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage : any;
  loader: any;
  usernameDisplay; any;
  version: any;
  user_id: string = null;
  isUser : any = null;
  isComplete: any = null;
  postID: any = null;

  private onResumeSubscription: Subscription;
  
  constructor(
    private app: App,
    public platform: Platform,
    public appVersion: AppVersion,
    public events: Events,
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private authService: AuthService,
    private apiService: ApiService,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private pushNotif : PushNotificationProvider,
    public global: GlobalProvider
  ) {

    this.user_id = null;

    this.checkRootPage()

    this.usernameDisplay = null;
    
    platform.ready().then(() => {
   
         // Branch initialization
         const handleBranch = () => {
          // only on devices
          if (!platform.is('cordova')) { return }
          const Branch = window['Branch'];
          console.log('Branch1',Branch);
          Branch.initSession().then(data => {
            console.log('Branch2',data);
        
            if (data['+clicked_branch_link']) {                              
              let slug ={wb_slug: data['wb_slug'],
                        wb_id: data['id']};

              let userID = localStorage.getItem('userID');
              if (userID){
                  this.nav.push('WellbeingMinutePage',slug);
              }              
            }
          });
        }
     

         statusBar.styleDefault();
         setTimeout(()=>{
          splashScreen.hide();
         },500);
          handleBranch();

          if(this.isApp()){
            //this.version = this.appVersion.getVersionNumber();
            //console.log(this.version);
            this.appVersion.getVersionNumber().then(version => {
              console.log(version);
              this.version = version;
            });
          } else {
              this.version = 'Testing';
          }
         
          // this is the script that will be triggered during the resume of application
          this.onResumeSubscription = platform.resume.subscribe((e) => {
              // console.log('RESUMED');
              events.publish('user:login','test',Date.now());
              // let checkLoader = this.loadingCtrl.create({});
              // checkLoader.present().then(() => {
              
              this.refreshAppData();
              
              //   checkLoader.dismiss();
              // });

              this.checkRootPage()
              handleBranch();               
          });

          // platform.pause.subscribe((e) => {
            // let checkLoader2 = this.loadingCtrl.create({});
            // checkLoader2.present().then(() => {
              // this.refreshAppData();
            //   checkLoader2.dismiss();
            // });
          // });

          events.subscribe('user:login', (user, time) => {
            if(localStorage.getItem('username') === null)
            {
              let userData = JSON.parse(localStorage.getItem('userData'));
              this.usernameDisplay = userData.user_login;    
            } else {
              this.usernameDisplay = localStorage.getItem('username');          
            }

            this.checkRootPage()
          });

          events.subscribe('app:changeroot', root =>  {
            this.rootPage = root;
          })


          // events for app service type changed
          events.subscribe('service:changed', () => {
            this.checkRootPage()
          })

          // events for next lms
          events.subscribe('lms:next', (arg) => {
            let current_content = ''
            let params = ''
            let cb = null

            // check if arguement is object
            if (typeof arg === 'object') {
              current_content = arg.current_content
              params = arg.params
              cb = arg.callback

            // otherwise its the current content
            } else {
              current_content = arg
            }

            this.global.loader = this.loadingCtrl.create();
            this.global.loader.present().then(() => {
              this.nextLMS(current_content, params, cb)
            })
          })

          // events for lms show page
          events.subscribe('lms:show', page => {
            // just making sure not to show the same page more
            if (this.nav.getActive().component.name == page.name)
              return

            this.nav.push(page.toString())
          })

          console.log('this.usernameDisplay',this.usernameDisplay);
          if(this.usernameDisplay === null) {
            let userData = JSON.parse(localStorage.getItem('userData'));   
            this.usernameDisplay = userData ? userData.user_login : 'N/A';    
  
          }
          
          // events for app push user ID
          events.subscribe('user:ID', (ID)=>{
             this.user_id = ID;
             console.log('push events.subscribe',this.user_id);           
             this.pushNotif.filterUserPush(this.user_id);       
          });      
      });

      //Handle back button 
         this.platform.registerBackButtonAction(() => {
          // Catches the active view
          let activeNav = this.app.getActiveNavs()[0];
          let activeView = activeNav.getActive();  
               
          if((activeView.name).includes('Lms') == true){
            this.nav.popToRoot();
          }else{
            this.nav.pop();
          }    
      });
}
 
  refreshAppData(){
    this.userCheck();
    // localStorage.removeItem('tool');
    // localStorage.removeItem('trending');
    // localStorage.removeItem('webinar');
    // localStorage.removeItem('home_settings');
    // this.apiService.load();
  }

  userCheck(){
    let userID = localStorage.getItem('userID');
    console.log('userID',userID); 
    if(userID && this.authService.authenticated){
      this.apiService.userExisting(userID).subscribe(
         data => {
            //console.log(data.data);
            if(data.data == false) {
              console.log('user is deleted');
              this.authService.logOut().subscribe(
                data => {
                  this.rootPage = LoginPage;
                },
                error => console.log(error)
                );
            }
         },
         error => console.log(error)
      );
    }     
  }

  logout(){
    console.log('logout button clicked in side menu');
    let logoutLoader = this.loadingCtrl.create({
      content: "Logging out..."
    });
    logoutLoader.present().then(() => {
      this.authService.logOut().subscribe(
        data => {
          this.rootPage = LoginPage;
          logoutLoader.dismiss();
        },
        error => {
          console.log(error)
          this.rootPage = LoginPage;
          logoutLoader.dismiss();
        });
      });
      
  }

  goBacktoHome(){
    this.app.getRootNav().popToRoot();
  }

  checkRootPage() {
    if(this.authService.authenticated) {
      let isLite = localStorage.getItem('company_service') === 'lite'
      this.rootPage = isLite ? 'LiteHomePage' : HomePage;
      // this.rootPage = HomePage;
    } else {
      this.rootPage = LoginPage;
    }
  }

  launchSite(){
    window.open("https://www.lifestreet.com.au/privacy-policy",'_system', 'location=yes');
  }

  launchTermsAndConditions(){
    this.app.getRootNav().push('TermsConditionsPage');
  }


  // called when destroy view
  ngOnDestroy() {
    this.events.unsubscribe('user:login')
    this.events.unsubscribe('service:changed')
    this.events.unsubscribe('user:ID')
    this.events.unsubscribe('lms:next')
    this.onResumeSubscription.unsubscribe();
  }

  public isApp(): boolean {
    if (this.platform.is('cordova')) {
      return true;
    }
    return false;
  }


  public nextLMS(current_content, params, callback) {
    this.apiService.getNextLMS(
      current_content,
      params
    ).subscribe(
      data => {
        console.log('data next lms : ', data)
        this.global.loader.dismiss()

        let new_page: any;

        switch (data.current_content) {
          case 'course-intro': new_page = 'LmsIntroPage'; break;
          case 'course-structure': new_page = 'LmsHomePage'; break;
          case 'course-module': new_page = 'LmsSummaryPage'; break;
          case 'course-lesson': new_page = 'LmsActivityPage'; break;
          case 'course-assessment-result': new_page = 'LmsViewResultsPage'; break;
          case 'course-module-scheduler': new_page = 'LmsSchedulingPage'; break;
          case 'course-module-end':
            if (data.content === '') {
              this.nav.popToRoot()
              this.events.publish('app:checklms')
            } else {
              new_page = 'LmsEndPage'
            }
            break;
        }

        // execute push new page
        if (new_page) {
          this.nav.push(new_page, data).then((i) => {
            let index = this.nav.getPrevious().index
            if (index != 0) {
              console.log('removing previous nav index: ', index)
              this.nav.remove(index)
            }
          });
        }

        // execute callback if exist
        if (typeof callback === 'function') {
          callback()
        }
      },

      error => {
        console.log('lms next error : ', error)
        this.global.loader.dismiss()
        this.global.showAlert('Error', error.data.message)
      }
    );
  }

}

