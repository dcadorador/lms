import { Platform, App } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { WellbeingMinutePage } from '../../pages/wellbeing-minute/wellbeing-minute'
import { LoginPage } from '../../pages/login/login';
import { ApiService } from '../../app/services/api.service';
import { AuthService } from '../../app/services/auth.service';
import { STATUS_COMPLETED } from '../../pages/wellbeing-minute/constants'

@Injectable()
export class PushNotificationProvider {
  rootPage : any = null;
  isUser : any = null;
  isComplete: any = null;
  postID: any = null;
  isPushedClicked: boolean = false;

  constructor(private app: App,
    private apiService: ApiService,
    private oneSignal: OneSignal,
    private authService: AuthService,
    private platform: Platform
  ) {
    console.log('Hello PushNotificationProvider Provider');
  }

  filterUserPush(ID){
    console.log('filterUserPush ID', ID)
    if (ID) {
      this.apiService.getUserWbMinute(ID).subscribe((data)=>{      
      
        // stop when data is null
        if (!data.data) { 
          this.isUser ="no";
          this.triggerNotification(this.isUser,ID); 
          return
        }

        this.postID =data.data.ID;
        this.isComplete = data.data.status;
        if(data.data == null || data.data.status == STATUS_COMPLETED){            
          this.isUser ="no";
        } else if(this.postID != null && data.data.status != STATUS_COMPLETED){
          this.isUser ="yes";                  
        }            
        console.log('this.isUser',this.isUser); 
        this.triggerNotification(this.isUser,ID);                   
      });     
    }
  }

  triggerNotification(isUser, ID)
  {
          if (!this.platform.is('cordova')) {
            return;
          }

          //Push notification
          // Define settings for iOS
          var iosSettings = {};
          iosSettings["kOSSettingsKeyAutoPrompt"] = true;
          iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;

          this.oneSignal.startInit('b655e411-7934-430f-a11d-319d39494af9', '381531518108');
                    
          window["plugins"].OneSignal.sendTags({"isUser":this.isUser,"userID":ID});
          window["plugins"].OneSignal.getTags (function(tags){
                console.log("Tags Received: 2" + JSON.stringify(tags));
                console.log('tags user id',tags.userID);
                window["plugins"].OneSignal.sendTags({"isUser":this.isUser,"userID":ID});
          });
         
          //this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
          this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
          
          this.oneSignal.handleNotificationReceived().subscribe(() => {
          // do something when notification is received
          });
          
          this.oneSignal.handleNotificationOpened().subscribe(() => {
            console.log('didOpenRemoteNotificationCallBack:1'); 
            // do something when a notification is opened
            if (ID){
               this.isPushedClicked = true;
               console.log('this.nav.push',this.isPushedClicked);
              this.app.getRootNavs()[0].push(WellbeingMinutePage, {userID: ID});                  
          
            }else{
              this.authService.logOut().subscribe(
                data => {
                  this.rootPage = LoginPage;
                },
                error => {
                  console.log(error)
                  this.rootPage = LoginPage;
                }
              );
            }             
          });
          
          this.oneSignal.endInit();    

          }

          isPushClicked(){            
              return this.isPushedClicked;               
          }
}
