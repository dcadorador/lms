import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpModule } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AuthService } from '../app/services/auth.service'
import { ApiService } from '../app/services/api.service'
import { UserService } from '../app/services/user.service';
import { Push } from '@ionic-native/push';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LmsPopoverPage  } from '../pages/lms-popover/lms-popover';
import { AppVersion } from '@ionic-native/app-version';
import { OneSignal } from '@ionic-native/onesignal';
//import { SafeHtmlPipe } from '../pipes/safe-html/safe-html';
import { PushNotificationProvider } from '../providers/push-notification/push-notification';
import { GlobalProvider } from '../providers/global/global';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
   // SafeHtmlPipe,
    LmsPopoverPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    LmsPopoverPage
  ],
  providers: [
    Push,
    StatusBar,
    SplashScreen,
    AuthService,
    ApiService,
    UserService,
    InAppBrowser,
    AppVersion, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OneSignal,
    PushNotificationProvider,
    GlobalProvider
  ]
})
export class AppModule {}
