webpackJsonp([5],{

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return STATUS_NOT_STARTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return STATUS_NOT_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return STATUS_COMPLETED; });
// constants.ts
// WELLBEING STATUS
var STATUS_NOT_STARTED = 0;
var STATUS_NOT_COMPLETED = 1;
var STATUS_COMPLETED = 2;
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PushNotificationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_onesignal__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_wellbeing_minute_wellbeing_minute__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_services_api_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_services_auth_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_wellbeing_minute_constants__ = __webpack_require__(135);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var PushNotificationProvider = /** @class */ (function () {
    function PushNotificationProvider(app, apiService, oneSignal, authService, platform) {
        this.app = app;
        this.apiService = apiService;
        this.oneSignal = oneSignal;
        this.authService = authService;
        this.platform = platform;
        this.rootPage = null;
        this.isUser = null;
        this.isComplete = null;
        this.postID = null;
        this.isPushedClicked = false;
        console.log('Hello PushNotificationProvider Provider');
    }
    PushNotificationProvider.prototype.filterUserPush = function (ID) {
        var _this = this;
        console.log('filterUserPush ID', ID);
        if (ID) {
            this.apiService.getUserWbMinute(ID).subscribe(function (data) {
                // stop when data is null
                if (!data.data) {
                    _this.isUser = "no";
                    _this.triggerNotification(_this.isUser, ID);
                    return;
                }
                _this.postID = data.data.ID;
                _this.isComplete = data.data.status;
                if (data.data == null || data.data.status == __WEBPACK_IMPORTED_MODULE_7__pages_wellbeing_minute_constants__["a" /* STATUS_COMPLETED */]) {
                    _this.isUser = "no";
                }
                else if (_this.postID != null && data.data.status != __WEBPACK_IMPORTED_MODULE_7__pages_wellbeing_minute_constants__["a" /* STATUS_COMPLETED */]) {
                    _this.isUser = "yes";
                }
                console.log('this.isUser', _this.isUser);
                _this.triggerNotification(_this.isUser, ID);
            });
        }
    };
    PushNotificationProvider.prototype.triggerNotification = function (isUser, ID) {
        var _this = this;
        if (!this.platform.is('cordova')) {
            return;
        }
        //Push notification
        // Define settings for iOS
        var iosSettings = {};
        iosSettings["kOSSettingsKeyAutoPrompt"] = true;
        iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;
        this.oneSignal.startInit('b655e411-7934-430f-a11d-319d39494af9', '381531518108');
        window["plugins"].OneSignal.sendTags({ "isUser": this.isUser, "userID": ID });
        window["plugins"].OneSignal.getTags(function (tags) {
            console.log("Tags Received: 2" + JSON.stringify(tags));
            console.log('tags user id', tags.userID);
            window["plugins"].OneSignal.sendTags({ "isUser": this.isUser, "userID": ID });
        });
        //this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationReceived().subscribe(function () {
            // do something when notification is received
        });
        this.oneSignal.handleNotificationOpened().subscribe(function () {
            console.log('didOpenRemoteNotificationCallBack:1');
            // do something when a notification is opened
            if (ID) {
                _this.isPushedClicked = true;
                console.log('this.nav.push', _this.isPushedClicked);
                _this.app.getRootNavs()[0].push(__WEBPACK_IMPORTED_MODULE_3__pages_wellbeing_minute_wellbeing_minute__["a" /* WellbeingMinutePage */], { userID: ID });
            }
            else {
                _this.authService.logOut().subscribe(function (data) {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
                }, function (error) {
                    console.log(error);
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
                });
            }
        });
        this.oneSignal.endInit();
    };
    PushNotificationProvider.prototype.isPushClicked = function () {
        return this.isPushedClicked;
    };
    PushNotificationProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_5__app_services_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_onesignal__["a" /* OneSignal */],
            __WEBPACK_IMPORTED_MODULE_6__app_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["m" /* Platform */]])
    ], PushNotificationProvider);
    return PushNotificationProvider;
}());

//# sourceMappingURL=push-notification.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LiteBookPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the LiteBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LiteBookPage = /** @class */ (function () {
    function LiteBookPage(navCtrl, navParams, sanitizer, events, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sanitizer = sanitizer;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.setBooking();
    }
    LiteBookPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LiteBookPage');
    };
    LiteBookPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        // notify lite home to check service again
        this.events.publish('lite:checkservice', function () {
            _this.setBooking();
            // sync fetch for lite home updates
            _this.events.publish('lite:homesettings', function () {
                _this.setIframe();
            });
        });
    };
    // refreshing page
    LiteBookPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        // notify lite home to check service again
        this.loader = this.loadingCtrl.create({ duration: 10000 });
        // show loader
        this.loader.present().then(function () {
            _this.bookcountry = null;
            _this.calendarUrl = null;
            // check service type again
            _this.events.publish('lite:checkservice', function () {
                _this.hideLoader();
                _this.setBooking();
                // fetch for lite home updates
                _this.events.publish('lite:homesettings', function () {
                    _this.setIframe();
                    _this.hideLoader();
                });
            });
        });
        refresher.complete();
    };
    // ----------------------- PRIVATE FUNCTIONS ----------------
    // sets calendar customize info
    LiteBookPage.prototype.setCalendar = function (user) {
        // checks if method is calendar
        if (this.bookcountry.method === 'calendar' && this.bookcountry.calendar !== '') {
            // prepare calendar url
            var url = this.bookcountry.calendar + '&email=' + user.user_email
                + '&firstName=' + user.firstname
                + '&lastName=' + user.lastname
                + '&field:5967886=' + user.company
                + '&phone=' + user.phone
                + '&field:6118884=' + 'APP'
                + '&field:5967889=' + user.unit;
            this.calendarUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
    };
    // sets and prepare iframe
    LiteBookPage.prototype.setIframe = function () {
        var _this = this;
        var bcountries = JSON.parse(localStorage.getItem('book_countries_setting'));
        var bfallback = JSON.parse(localStorage.getItem('book_fallback_setting'));
        var user = JSON.parse(localStorage.getItem('userData'));
        var cc = user.profile.user_country_code;
        // determine country of the user for book setting
        bcountries.forEach(function (bc) {
            // check each country
            if (bc.country === cc) {
                // set book country setting
                _this.bookcountry = bc;
            }
        });
        // if user's country does not match any company's booking country
        if (typeof this.bookcountry === 'undefined' || this.bookcountry === null) {
            // validate fallback settings
            if (!bfallback || (bfallback.calendar === '' && bfallback.text === '')) {
                var alert_1 = this.alertCtrl.create({
                    title: 'Booking Error',
                    subTitle: '<br><small>[ERROR][LITE] L300</small><br> It seems there are no default booking settings <br><br> <b>Please contact Life Street to discuss your options</b>',
                    buttons: ['OK']
                });
                alert_1.present();
                this.note = 'Please contact Life Street to discuss your options.';
                return;
            }
            // get booking fallback settings
            this.bookcountry = bfallback;
        }
        console.log('booking setting: ', bfallback, this.bookcountry);
        // try to sets user's calendar
        this.setCalendar(user);
    };
    // sets booking settings
    LiteBookPage.prototype.setBooking = function () {
        this.note = '';
        // get settings
        var settings = JSON.parse(localStorage.getItem('lite_home_settings'));
        // populate book properties
        this.book = { title: settings.book_an_appointment_title };
    };
    LiteBookPage.prototype.hideLoader = function () {
        if (this.loader != null) {
            this.loader.dismiss();
            this.loader = null;
        }
    };
    LiteBookPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-lite-book',template:/*ion-inline-start:"D:\Ionic\lifestreet_mobile_app\src\pages\lite-book\lite-book.html"*/'<ion-header>\n\n  <ion-toolbar color="navbar" align-title="center" padding>\n\n\n\n    <ion-buttons left>\n\n        <button ion-button icon-only (click)="this.navCtrl.pop()">\n\n            <ion-icon name="arrow-back"></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n\n\n    <ion-buttons end>\n\n        <button menuToggle ion-button icon-only>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n    <ion-title class="ion-text-start">\n\n        <img alt="logo" src="assets/images/lifestreet_home_logo.jpg">\n\n    </ion-title>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n      <ion-refresher-content pullingText="Pull to refresh..." refreshingText="Refreshing...">\n\n      </ion-refresher-content>\n\n  </ion-refresher>\n\n\n\n  <div id="book-content">\n\n    <h1 text-center>{{ book.title }}</h1>\n\n\n\n\n\n    <div *ngIf="!bookcountry?.method" text-center>\n\n      <ion-spinner *ngIf="note == \'\'" color="light"></ion-spinner>\n\n      <small padding *ngIf="note !== \'\'">{{ note }}</small>\n\n    </div>\n\n\n\n    <!-- if textbase appointment type -->\n\n    <div id="book-textbase" *ngIf="bookcountry?.method === \'text_phone\'" [innerHtml]="bookcountry?.text" padding></div>\n\n\n\n\n\n    <div id="book-calendar" *ngIf="bookcountry?.method === \'calendar\'">\n\n        <p *ngIf="!calendarUrl" text-center>No calendar link set</p>\n\n        <!-- else if calendar appointment type -->\n\n        <iframe *ngIf="calendarUrl" id="book-frame" width="100%" height="100%" [src]="calendarUrl"></iframe>\n\n    </div>\n\n\n\n  </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Ionic\lifestreet_mobile_app\src\pages\lite-book\lite-book.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], LiteBookPage);
    return LiteBookPage;
}());

//# sourceMappingURL=lite-book.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LiteContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_api_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_user_service__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the LiteContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LiteContactPage = /** @class */ (function () {
    function LiteContactPage(navCtrl, navParams, alertCtrl, loadingCtrl, apiService, userService, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.apiService = apiService;
        this.userService = userService;
        this.events = events;
        this.setContact();
        this.initApi();
    }
    LiteContactPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LiteContactPage');
    };
    LiteContactPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        // notify lite home to check service again
        this.events.publish('lite:checkservice');
        // sync fetch for lite home updates
        this.events.publish('lite:homesettings', function () {
            _this.setContact();
        });
    };
    // refreshing page
    LiteContactPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        var loader = this.loadingCtrl.create({ duration: 10000 });
        // show loader
        loader.present().then(function () {
            // notify lite home to check service again
            _this.events.publish('lite:checkservice', function () {
                loader.dismiss();
            });
            // sync fetch for lite home updates
            _this.events.publish('lite:homesettings', function () {
                _this.setContact();
                _this.initApi();
            });
        });
        refresher.complete();
    };
    // ----------------------- COMMON FUNCTIONS ---------------
    LiteContactPage.prototype.setContact = function () {
        // get settings
        var settings = JSON.parse(localStorage.getItem('lite_home_settings'));
        // populate contact properties
        this.contact = {
            title: settings.ask_a_question_title
        };
    };
    LiteContactPage.prototype.initApi = function () {
        var _this = this;
        this.input = {
            firstname: '',
            lastname: '',
            email: '',
            message: ''
        };
        // get connect form
        this.apiService.postForm(37).subscribe(function (data) {
            _this.connect_form = data.data.structure;
        }, function (error) { return console.log(error); });
    };
    LiteContactPage.prototype.submitContact = function (e) {
        var _this = this;
        // prevent form from submitting when there is no form id provided
        if (!this.connect_form) {
            var alert_1 = this.alertCtrl.create({
                title: 'Contact Form Error',
                subTitle: '<br><small>[ERROR][LITE] L401</small><br> Cannot submit now <br><br> <b>Please try to refresh the page.</b>',
                buttons: ['OK']
            });
            alert_1.present();
            return;
        }
        var errors = [];
        // email regex
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // validate all
        if (!regex.test(String(this.input.email).toLowerCase())) {
            errors.push('*email is invalid');
        }
        if (!this.input.message || this.input.message.trim() === '') {
            errors.push('*message is empty');
        }
        if (!this.input.firstname || this.input.firstname.trim() === '') {
            errors.push('*first name is empty');
        }
        if (!this.input.lastname || this.input.lastname.trim() === '') {
            errors.push('*last name is empty');
        }
        if (errors.length > 0) {
            var alert_2 = this.alertCtrl.create({
                title: 'Contact Form Error',
                subTitle: errors.join('<br>') + '<br><br> <b>Please try again.</b>',
                buttons: ['OK']
            });
            alert_2.present();
        }
        else {
            // create loader
            var loader_1 = this.loadingCtrl.create({ duration: 10000 });
            // create alert 
            var alert_3 = this.alertCtrl.create({
                title: 'Confirmation',
                subTitle: 'Thanks for contacting us! We will get in touch with you shortly.',
                buttons: ['Dismiss']
            });
            loader_1.present().then(function () {
                var data_input = [];
                data_input.push(['index_1', _this.input.firstname + ' ' + _this.input.lastname]);
                data_input.push(['index_7', 'email']);
                data_input.push(['index_3', _this.input.email]);
                data_input.push(['index_4', '']);
                data_input.push(['index_5', '']);
                data_input.push(['index_6', _this.input.message]);
                data_input.push(['index_8', '']);
                var apiData = {
                    'user': _this.userService.userId,
                    'data': data_input
                };
                _this.apiService.postQuizResponse(_this.connect_form.id, apiData).subscribe(function (data) {
                    loader_1.dismiss();
                    alert_3.present();
                    _this.navCtrl.pop();
                }, function (error) {
                    console.error(error);
                    loader_1.dismiss();
                    var alert = _this.alertCtrl.create({
                        title: 'Contact Form Error',
                        subTitle: '<br><small>[ERROR][LITE] L400</small><br> Fail to contact <br><br> <b>Please try again later.</b>',
                        buttons: ['OK']
                    });
                    alert.present();
                });
            });
        }
    };
    LiteContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-lite-contact',template:/*ion-inline-start:"D:\Ionic\lifestreet_mobile_app\src\pages\lite-contact\lite-contact.html"*/'<ion-header>\n\n  <ion-toolbar color="navbar" align-title="center" padding>\n\n\n\n    <ion-buttons left>\n\n        <button ion-button icon-only (click)="this.navCtrl.pop()">\n\n            <ion-icon name="arrow-back"></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n\n\n    <ion-buttons end>\n\n        <button menuToggle ion-button icon-only>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n    <ion-title class="ion-text-start">\n\n        <img alt="logo" src="assets/images/lifestreet_home_logo.jpg">\n\n    </ion-title>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n      <ion-refresher-content pullingText="Pull to refresh..." refreshingText="Refreshing...">\n\n      </ion-refresher-content>\n\n  </ion-refresher>\n\n\n\n\n\n  <div id="contact-content" padding>\n\n    <h1 padding-top text-center>{{ contact.title }}</h1>\n\n\n\n\n\n    <form (ngSubmit)="submitContact()">\n\n      <div>\n\n        <label>\n\n          First Name\n\n        </label>\n\n        <div>\n\n          <input [(ngModel)]="input.firstname" type="text" name="firstname">\n\n        </div>\n\n      </div>\n\n\n\n      <div padding-top>\n\n        <label>\n\n          Last Name\n\n        </label>\n\n        <div>\n\n          <input [(ngModel)]="input.lastname" type="text" name="lastname">\n\n        </div>\n\n      </div>\n\n\n\n      <div padding-top>\n\n        <label>\n\n          Email Address\n\n        </label>\n\n        <div>\n\n          <input [(ngModel)]="input.email" type="email" name="email">\n\n        </div>\n\n      </div>\n\n\n\n      <div padding-top>\n\n        <label>\n\n          Message\n\n        </label>\n\n        <div>\n\n          <textarea [(ngModel)]="input.message" rows="6" name="message"></textarea>\n\n        </div>\n\n      </div>\n\n\n\n\n\n      <div padding-top>\n\n        <button type="submit" ion-button color="dark" full>SUBMIT</button>\n\n      </div>\n\n\n\n\n\n    </form>\n\n  </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Ionic\lifestreet_mobile_app\src\pages\lite-contact\lite-contact.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__app_services_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_3__app_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], LiteContactPage);
    return LiteContactPage;
}());

//# sourceMappingURL=lite-contact.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LiteEapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the LiteEapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LiteEapPage = /** @class */ (function () {
    function LiteEapPage(navCtrl, navParams, events, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.setEap();
    }
    LiteEapPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LiteEapPage');
    };
    LiteEapPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        // notify lite home to check service again
        this.events.publish('lite:checkservice');
        // fetch for lite home updates
        this.events.publish('lite:homesettings', function () {
            _this.setEap();
        });
    };
    // refreshing page
    LiteEapPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        // notify lite home to check service again
        this.loader = this.loadingCtrl.create({ duration: 10000 });
        // show loader
        this.loader.present().then(function () {
            // check service type again
            _this.events.publish('lite:checkservice', function () {
                _this.hideLoader();
            });
            // fetch for lite home updates
            _this.events.publish('lite:homesettings', function () {
                _this.setEap();
            });
        });
        refresher.complete();
    };
    // ----------------------- EAP COMMON FUNCTIONS ---------------------
    LiteEapPage.prototype.setEap = function () {
        // get settings
        var settings = JSON.parse(localStorage.getItem('lite_home_settings'));
        // populate eap properties
        this.eap = {
            content: settings.eap_content,
            image: settings.eap_image,
            title: settings.eap_title
        };
        this.hideLoader();
    };
    LiteEapPage.prototype.hideLoader = function () {
        if (this.loader != null) {
            this.loader.dismiss();
            this.loader = null;
        }
    };
    LiteEapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-lite-eap',template:/*ion-inline-start:"D:\Ionic\lifestreet_mobile_app\src\pages\lite-eap\lite-eap.html"*/'<ion-header>\n\n  <ion-toolbar color="navbar" align-title="center" padding>\n\n\n\n    <ion-buttons left>\n\n        <button ion-button icon-only (click)="this.navCtrl.pop()">\n\n            <ion-icon name="arrow-back"></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n\n\n    <ion-buttons end>\n\n        <button menuToggle ion-button icon-only>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n    <ion-title class="ion-text-start">\n\n        <img alt="logo" src="assets/images/lifestreet_home_logo.jpg">\n\n    </ion-title>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content pullingText="Pull to refresh..." refreshingText="Refreshing...">\n\n        </ion-refresher-content>\n\n    </ion-refresher>\n\n\n\n    <div id="eap-banner">\n\n      <img src="{{ eap.image || \'https://placehold.it/300x450\' }}" />\n\n    </div>\n\n\n\n    <div padding>\n\n      <div id="eap-content">\n\n        <h1 padding-top text-center>{{ eap.title }}</h1>\n\n        <div padding-top [innerHTML]="eap.content"></div>\n\n      </div>\n\n    </div>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Ionic\lifestreet_mobile_app\src\pages\lite-eap\lite-eap.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], LiteEapPage);
    return LiteEapPage;
}());

//# sourceMappingURL=lite-eap.js.map

/***/ }),

/***/ 171:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 171;

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ApiService = /** @class */ (function () {
    // private apiUrl = 'https://api.lifestreet.com.au/api';
    //private apiUrl = 'http://lsapi.app/api';
    // private apiUrl ='https://lifestreet.stageserve.com/wp-json/lifestreet/api/v1';
    function ApiService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.apiUrl = 'https://lifestreetapi.stageserve.com/api';
    }
    ApiService.prototype.requestOptions = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authService.token
        });
        return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
    };
    ApiService.prototype.handleError = function (error) {
        console.log(JSON.parse(error._body));
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(JSON.parse(error._body));
    };
    ApiService.prototype.userProfile = function (id) {
        return this.http.get(this.apiUrl + "/users/" + id, this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ApiService.prototype.userForm = function (id, form) {
        return this.http.get(this.apiUrl + "/users/" + id + "/forms/" + form, this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ApiService.prototype.userExisting = function (id) {
        return this.http.post(this.apiUrl + "/users/" + id + "/existing", this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ApiService.prototype.userPosts = function (id, type) {
        if (type === void 0) { type = null; }
        if (type) {
            return this.http.get(this.apiUrl + "/users/" + id + "/posts?type=" + type, this.requestOptions())
                .map(function (response) { return response.json(); })
                .catch(this.handleError);
        }
        return this.http.get(this.apiUrl + "/users/" + id + "/posts", this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ApiService.prototype.userFormResults = function (id, form) {
        //console.log(`${this.apiUrl}/users/${id}/forms/${form}/results`);
        return this.http.get(this.apiUrl + "/users/" + id + "/forms/" + form + "/results", this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ApiService.prototype.trendingPosts = function (type) {
        if (type === void 0) { type = null; }
        if (type) {
            return this.http.get(this.apiUrl + "/posts/trending?type=" + type, this.requestOptions())
                .map(function (response) { return response.json(); })
                .catch(this.handleError);
        }
        return this.http.get(this.apiUrl + "/posts/trending", this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ApiService.prototype.userTrendingPosts = function (id, type) {
        if (type === void 0) { type = null; }
        if (type) {
            return this.http.get(this.apiUrl + "/users/" + id + "/posts/featured?type=" + type, this.requestOptions())
                .map(function (response) { return response.json(); })
                .catch(this.handleError);
        }
        return this.http.get(this.apiUrl + "/users/" + id + "/posts/featured", this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ApiService.prototype.post = function (id, type) {
        if (type === void 0) { type = null; }
        if (type) {
            return this.http.get(this.apiUrl + "/posts/" + id + "?type=" + type, this.requestOptions())
                .map(function (response) { return response.json(); })
                .catch(this.handleError);
        }
        return this.http.get(this.apiUrl + "/posts/" + id, this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ApiService.prototype.postForm = function (id) {
        return this.http.get(this.apiUrl + "/forms/" + id + "/meta", this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ApiService.prototype.postFormResponse = function (id, data) {
        var jsonRequest = JSON.stringify(data);
        console.log(jsonRequest);
        return this.http.post(this.apiUrl + "/forms/" + id, jsonRequest, this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ApiService.prototype.postByUrl = function (url) {
        return this.http.get(this.apiUrl + "/posts/url?url=" + url, this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ApiService.prototype.getForm = function (id) {
        return this.http.post(this.apiUrl + "/forms/" + id, this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ApiService.prototype.postQuizResponse = function (id, data) {
        var jsonRequest = JSON.stringify(data);
        console.log(jsonRequest);
        return this.http.post(this.apiUrl + "/forms/" + id + "/quiz", jsonRequest, this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ApiService.prototype.homeSettings = function (user) {
        if (user === void 0) { user = null; }
        if (user) {
            return this.http.get(this.apiUrl + "/home/settings?user=" + user, this.requestOptions())
                .map(function (response) { return response.json(); })
                .catch(this.handleError);
        }
        return this.http.get(this.apiUrl + "/home/settings", this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ApiService.prototype.liteHomeSettings = function () {
        return this.http.get(this.apiUrl + "/lite/settings", this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ApiService.prototype.bookingSettings = function () {
        return this.http.get(this.apiUrl + "/booking/settings", this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ApiService.prototype.trendingUpdated = function () {
        return this.http.get(this.apiUrl + "/posts/trending/updated", this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ApiService.prototype.userTrendingUpdated = function (id) {
        return this.http.get(this.apiUrl + "/users/" + id + "/posts/trending/updated", this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ApiService.prototype.userTrendingCheck = function (id) {
        var _this = this;
        /*return this.http.get(`${this.apiUrl}/users/${id}/posts/featured/check`, this.requestOptions())
            .toPromise()
            .then(
                response => {
                    localStorage.setItem('user_trending_check',JSON.stringify(response));
                    return response;
                },
                error => {
                    console.log(error);
                }
            )*/
        return new Promise(function (resolve) {
            _this.http.get(_this.apiUrl + "/users/" + id + "/posts/featured/check", _this.requestOptions())
                .subscribe(function (data) {
                resolve(JSON.parse(data["_body"]));
            }, function (error) {
                console.log(error);
            });
        });
    };
    ApiService.prototype.userTools = function (id) {
        return this.http.get(this.apiUrl + "/users/" + id + "/tools/featured", this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ApiService.prototype.getCompanyId = function () {
        var _this = this;
        var uid = localStorage.getItem('userID');
        return new Promise(function (res, err) {
            _this.homeSettings(uid).subscribe(function (data) {
                console.log('sets company id');
                localStorage.setItem('compId', data.data.company_id);
                res(data.data.company_id);
            }, function (error) {
                console.log(error);
                err(error);
            });
        });
    };
    ApiService.prototype.clearCache = function () {
        var _this = this;
        return new Promise(function (res, err) {
            _this.http.get(_this.apiUrl + "/clearCache", _this.requestOptions())
                .subscribe(function () { res(true); }, function (error) { err(error); });
        });
    };
    ApiService.prototype.load = function () {
        var _this = this;
        console.log('refreshing from the api');
        this.trendingPosts().subscribe(function (data) {
            localStorage.setItem('trending', JSON.stringify(data));
        }, function (error) { return console.log(error); });
        this.trendingPosts('webinar').subscribe(function (data) { return localStorage.setItem('webinar', JSON.stringify(data)); }, function (error) { return console.log(error); });
        this.trendingPosts('tool').subscribe(function (post) {
            _this.post(post.data.tool).subscribe(function (data) {
                localStorage.setItem('tool', JSON.stringify(data));
            }, function (error) { return console.log(error); });
        });
        this.homeSettings().subscribe(function (data) {
            localStorage.setItem('home_settings', JSON.stringify(data));
        }, function (error) { return console.log(error); });
    };
    ApiService.prototype.loadPost = function () {
        var _this = this;
        return {
            // info of this post
            info: function ($id) {
                return new Promise(function (res, err) {
                    if (!$id || $id === 'undefined' || typeof $id == 'undefined') {
                        err('info invalid id ' + $id);
                        return;
                    }
                    _this.clearCache()
                        .then(function () {
                        _this.http
                            .get(_this.apiUrl + "/posts/" + $id, _this.requestOptions())
                            .map(function (response) { return response.json(); })
                            .subscribe(
                        // success to fetch post
                        function (_a) {
                            // add localStorage here
                            var data = _a.data;
                            var bookcountries = [];
                            var bookfallback = {
                                method: '',
                                calendar: '',
                                text: ''
                            };
                            // iterate meta
                            data.meta.forEach(function (meta) {
                                if (typeof meta.meta_key === 'undefined') {
                                    // do nothing
                                    // store company service
                                }
                                else if (meta.meta_key === '_company_type_of_service') {
                                    localStorage.setItem('company_service', meta.meta_value);
                                    // for book settings
                                }
                                else if (meta.meta_key.indexOf('add_country_') === 0) {
                                    // split to segregate metaKeys
                                    var metaKey = meta.meta_key.split('add_country_')[1];
                                    // get id of country repeater and insert to countries
                                    var id = metaKey.charAt(0);
                                    // initiate book country id
                                    if (typeof bookcountries[id] === 'undefined') {
                                        bookcountries[id] = {};
                                    }
                                    // to get country
                                    if (metaKey.indexOf('_country') > 0) {
                                        // insert country value
                                        bookcountries[id].country = meta.meta_value;
                                    }
                                    // to get method
                                    if (metaKey.indexOf('_booking_method') > 0) {
                                        // insert method value
                                        bookcountries[id].method = meta.meta_value;
                                    }
                                    // to get textphone content
                                    if (metaKey.indexOf('_textphone_content') > 0) {
                                        // insert textphone content value
                                        bookcountries[id].text = meta.meta_value;
                                    }
                                    // to get calendar link
                                    if (metaKey.indexOf('_calendar_link') > 0) {
                                        // insert textphone content value
                                        bookcountries[id].calendar = meta.meta_value;
                                    }
                                    // bookcountries.push(meta)
                                    // otherwise try to check fallback book method
                                }
                                else if (meta.meta_key === 'booking_method') {
                                    bookfallback.method = meta.meta_value;
                                    // check fallback calendar link
                                }
                                else if (meta.meta_key === 'calendar_link') {
                                    bookfallback.calendar = meta.meta_value;
                                    // check fallback textphone content
                                }
                                else if (meta.meta_key === 'textphone_content') {
                                    bookfallback.text = meta.meta_value;
                                }
                            });
                            // console.log('bookcountries : ', bookcountries)
                            // store bookcountries setting
                            localStorage.setItem('book_countries_setting', JSON.stringify(bookcountries));
                            localStorage.setItem('book_fallback_setting', JSON.stringify(bookfallback));
                            res(data);
                        }, 
                        // error to fetch post
                        function (error) {
                            console.log(error);
                            err(error);
                        });
                    })
                        .catch(function (error) {
                        err(error);
                    });
                });
            },
            // trending post
            trendingPost: function () {
                return new Promise(function (res, err) {
                    _this.trendingPosts().subscribe(function (data) {
                        localStorage.setItem('trending', JSON.stringify(data));
                        res(data);
                    }, function (error) {
                        console.log(error);
                        err(error);
                    });
                });
            },
            // trending webinar
            trendingWebinar: function () {
                return new Promise(function (res, err) {
                    _this.trendingPosts('webinar').subscribe(function (data) {
                        localStorage.setItem('webinar', JSON.stringify(data));
                        res(data);
                    }, function (error) {
                        console.log(error);
                        err(error);
                    });
                });
            },
            // trending tools
            trendingTool: function () {
                return new Promise(function (res, err) {
                    _this.trendingPosts('tool').subscribe(function (post) {
                        _this.post(post.data.tool).subscribe(function (data) {
                            localStorage.setItem('tool', JSON.stringify(data));
                            res(data);
                        }, function (error) {
                            console.log(error);
                            err(error);
                        });
                    });
                });
            }
        };
    };
    ApiService.prototype.loadUserContent = function (id) {
        var _this = this;
        return new Promise(function (resolve, error) {
            return _this.homeSettings(id).subscribe(function (data) {
                localStorage.removeItem('home_settings');
                localStorage.setItem('home_settings', JSON.stringify(data));
                Promise.all([
                    new Promise(function (res, err) {
                        _this.userTrendingPosts(id).subscribe(function (data) {
                            localStorage.setItem('user_trending', JSON.stringify(data));
                            res();
                        }, function (error) {
                            console.log(error);
                            err(error);
                        });
                    }),
                    new Promise(function (res, err) {
                        _this.userTrendingPosts(id, 'webinar').subscribe(function (data) {
                            localStorage.setItem('user_webinar', JSON.stringify(data));
                            res();
                        }, function (error) {
                            console.log(error);
                            err(error);
                        });
                    }),
                    new Promise(function (res, err) {
                        _this.userTools(id).subscribe(function (data) {
                            localStorage.setItem('user_tool', JSON.stringify(data));
                            res();
                        }, function (error) {
                            console.log(error);
                            err(error);
                        });
                    }),
                    new Promise(function (res, err) {
                        _this.userTrendingUpdated(id).subscribe(function (data) {
                            localStorage.setItem('user_trending_last_update', JSON.stringify(data.data.trending_updated_date));
                            res();
                        }, function (error) {
                            console.log(error);
                            err(error);
                        });
                    }),
                ]).then(function () {
                    resolve(data);
                });
            }, function (err) {
                console.log(err);
                error(err);
            });
        });
    };
    ApiService.prototype.deleteStorageData = function () {
        localStorage.removeItem('trending');
        localStorage.removeItem('webinar');
        localStorage.removeItem('tool');
        localStorage.removeItem('home_settings');
    };
    // get wellbeing minute by user id
    ApiService.prototype.getUserWbMinute = function (userid) {
        return this.http.get(this.apiUrl + "/wellbeing/user/" + userid, this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    // get specific wellbeing details
    ApiService.prototype.getWellbeingMinute = function (id, userid) {
        return this.http.get(this.apiUrl + "/wellbeing/detail/" + id + "/" + userid, this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    // update specific wellbeing minute status with user
    ApiService.prototype.updateWellbeingMinute = function (userId, data) {
        return this.http.put(this.apiUrl + "/wellbeing/user/" + userId, data, this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    // get all wellbeing minute
    ApiService.prototype.wellbeingMinute = function () {
        return this.http.get(this.apiUrl + "/wellbeing", this.requestOptions())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ApiService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]])
    ], ApiService);
    return ApiService;
}());

//# sourceMappingURL=api.service.js.map

/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/lite-book/lite-book.module": [
		701,
		4
	],
	"../pages/lite-contact/lite-contact.module": [
		702,
		3
	],
	"../pages/lite-eap/lite-eap.module": [
		703,
		2
	],
	"../pages/lite-home/lite-home.module": [
		704,
		1
	],
	"../pages/wellbeing-minute/wellbeing-minute.module": [
		705,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 224;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthService = /** @class */ (function () {
    function AuthService(http
        //private userService: UserService
    ) {
        this.http = http;
        this.apiUrl = 'https://lifestreetapi.stageserve.com/api';
        // private apiUrl = 'https://api.lifestreet.com.au/api';
        //private apiUrl = 'http://lsapi.app/api';
        this.apiHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json',
            })
        });
        this.token = localStorage.getItem('token');
        this.user_id = localStorage.getItem('userID');
    }
    Object.defineProperty(AuthService.prototype, "authenticated", {
        get: function () {
            return this.token !== null;
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.handleError = function (error) {
        console.log(error);
        return error.status == 0 ? __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error) : __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(JSON.parse(error._body));
    };
    AuthService.prototype.authenticate = function (username, password) {
        var _this = this;
        var json = JSON.stringify({
            username: username,
            password: password
        });
        return this.http.post(this.apiUrl + "/login", json, this.apiHeaders)
            .map(function (response) {
            _this.token = response.json().token;
            localStorage.setItem('token', _this.token);
            localStorage.setItem('userID', response.json().data.ID);
            localStorage.setItem('userData', JSON.stringify(response.json().data));
            localStorage.setItem('userProfile', JSON.stringify(response.json().data.profile));
            localStorage.setItem('compId', response.json().data.company_id);
            return response.json();
        })
            .catch(this.handleError);
    };
    AuthService.prototype.logOut = function () {
        var json = JSON.stringify({
            token: localStorage.getItem('token')
        });
        // even with fail request, local storage must be empty
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        localStorage.removeItem('userData');
        localStorage.removeItem('userProfile');
        localStorage.removeItem('article');
        localStorage.removeItem('tool');
        localStorage.removeItem('video');
        localStorage.removeItem('username');
        localStorage.removeItem('trending');
        localStorage.removeItem('webinar');
        localStorage.removeItem('user_webinar_form_assessed');
        localStorage.removeItem('userProfile');
        localStorage.removeItem('home_settings');
        localStorage.removeItem('user_trending');
        localStorage.removeItem('user_webinar');
        localStorage.removeItem('user_tool');
        localStorage.removeItem('user_trending_last_update');
        localStorage.removeItem('user_trending_check');
        localStorage.removeItem('company_service');
        localStorage.removeItem('compId');
        localStorage.removeItem('lite_home_settings');
        localStorage.removeItem('book_countries_setting');
        localStorage.removeItem('book_fallback_setting');
        return this.http.post(this.apiUrl + "/logout", json, this.apiHeaders)
            .map(function (response) {
            console.log(response.json());
        })
            .catch(this.handleError);
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]
            //private userService: UserService
        ])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LiteAboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the LiteAboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LiteAboutPage = /** @class */ (function () {
    function LiteAboutPage(navCtrl, navParams, events, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.setAbout();
    }
    LiteAboutPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LiteAboutPage');
    };
    LiteAboutPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        // notify lite home to check service again
        this.events.publish('lite:checkservice');
        // fetch for lite home updates
        this.events.publish('lite:homesettings', function () {
            _this.setAbout();
        });
    };
    // refreshing page
    LiteAboutPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        // notify lite home to check service again
        this.loader = this.loadingCtrl.create({ duration: 10000 });
        // show loader
        this.loader.present().then(function () {
            // check service type again
            _this.events.publish('lite:checkservice', function () {
                _this.hideLoader();
            });
            // fetch for lite home updates
            _this.events.publish('lite:homesettings', function () {
                _this.setAbout();
            });
        });
        refresher.complete();
    };
    // ----------------------- ABOUT COMMON FUNCTIONS ---------------------
    LiteAboutPage.prototype.setAbout = function () {
        // get settings
        var settings = JSON.parse(localStorage.getItem('lite_home_settings'));
        // populate about properties
        this.about = {
            title: settings.about_your_eap_title,
            line_above: settings.your_eap_content_above_line,
            line_below: settings.your_eap_content_below_line
        };
        this.hideLoader();
    };
    LiteAboutPage.prototype.hideLoader = function () {
        if (this.loader != null) {
            this.loader.dismiss();
            this.loader = null;
        }
    };
    LiteAboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-lite-about',template:/*ion-inline-start:"D:\Ionic\lifestreet_mobile_app\src\pages\lite-about\lite-about.html"*/'<ion-header>\n\n  <ion-toolbar color="navbar" align-title="center" padding>\n\n\n\n    <ion-buttons left>\n\n        <button ion-button icon-only (click)="this.navCtrl.pop()">\n\n            <ion-icon name="arrow-back"></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n\n\n    <ion-buttons end>\n\n        <button menuToggle ion-button icon-only>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n    <ion-title class="ion-text-start">\n\n        <img alt="logo" src="assets/images/lifestreet_home_logo.jpg">\n\n    </ion-title>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n      <ion-refresher-content pullingText="Pull to refresh..." refreshingText="Refreshing...">\n\n      </ion-refresher-content>\n\n  </ion-refresher>\n\n\n\n  <div id="about-content" padding-top text-center>\n\n      <h1>{{ about.title }}</h1>\n\n      <div padding-top padding-bottom [innerHTML]="about.line_above"></div>\n\n\n\n      <hr>\n\n\n\n      <div padding-top [innerHTML]="about.line_below"></div>\n\n\n\n  </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Ionic\lifestreet_mobile_app\src\pages\lite-about\lite-about.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], LiteAboutPage);
    return LiteAboutPage;
}());

//# sourceMappingURL=lite-about.js.map

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_api_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_user_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__results_results__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_services_auth_service__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ToolPage = /** @class */ (function () {
    function ToolPage(navCtrl, navParams, loadingCtrl, apiService, userService, authService, alertCtrl, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.apiService = apiService;
        this.userService = userService;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.input = [];
        this.tool = this.navParams.get('tool');
        var loader = this.loadingCtrl.create({ duration: 10000 });
        console.log(this.tool);
        loader.present().then(function () {
            if (_this.tool) {
                _this.tool.meta.forEach(function (meta) {
                    if (meta.meta_key == '_assessment_quiz_id') {
                        _this.apiService.postForm(meta.meta_value).subscribe(function (data) {
                            _this.tool_form = data.data.structure;
                            //console.log(this.tool_form.description);
                            //loader.dismiss();
                        }, function (error) { return console.log(error); });
                    }
                });
            }
            /*this.tool.meta.forEach((meta) =>{
              if(meta.meta_key == 'tool_description') {
                this.tool_page_description = meta.meta_value;
                console.log(this.tool_page_description);
              }
            });*/
            _this.apiService.post(_this.tool.ID).subscribe(function (data) {
                var tool_meta = data.data.meta;
                tool_meta.forEach(function (meta) {
                    if (meta.meta_key == 'tool_description') {
                        _this.tool_page_description = meta.meta_value;
                        console.log(_this.tool_page_description);
                    }
                });
                loader.dismiss();
            }, function (error) {
                console.log(error);
                loader.dismiss();
            });
        });
    }
    ToolPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ToolPage');
    };
    ToolPage.prototype.ionViewWillEnter = function () {
        // notify app home to check service again
        this.events.publish('app:checkservice');
    };
    ToolPage.prototype.onChange = function (choice, index) {
        console.log('index_' + index + ' ' + choice);
        var idx = 'index_' + index;
        var obj = [];
        obj.push(idx);
        obj.push(choice);
        var objidx = null;
        this.input.forEach(function (arr, i) {
            if (arr[0] == idx) {
                objidx = i;
            }
        });
        if (objidx !== null && this.input.length > 0) {
            this.input.splice(objidx, 1);
        }
        this.input.push(obj);
        //console.log(this.input);
    };
    ToolPage.prototype.getStyle = function (i) {
        i = i + 1;
        if (i % 2 == 1) {
            return 'white';
        }
        else {
            return '#DCDDDE';
        }
    };
    ToolPage.prototype.getPaddingTop = function (i) {
        i = i + 1;
        if (i % 2 == 1) {
            return '1.75%';
        }
    };
    ToolPage.prototype.getPaddingBottom = function (i) {
        i = i + 1;
        if (i % 2 == 1) {
            return '7%';
        }
    };
    ToolPage.prototype.onSubmit = function () {
        var _this = this;
        // prevent form from submitting when there is no form id provided
        if (!this.tool_form) {
            var alert_1 = this.alertCtrl.create({
                title: 'Form Error',
                subTitle: '<br><small>[ERROR][APP] A100</small><br> Cannot submit now <br><br> <b>Please try to refresh the page.</b>',
                buttons: ['OK']
            });
            alert_1.present();
            return;
        }
        //console.log(this.tool_form);
        //console.log(this.input);
        /**
         * DECLARE VARIABLES
         */
        var field_counter = 0;
        var tool_fields = this.tool_form.fields;
        var question_num = [];
        var input_num = [];
        var missing_input = '';
        //console.log(tool_fields);
        /**
         * Loop through the form fields that is required
         */
        tool_fields.forEach(function (field) {
            if (field.isRequired == true) {
                field_counter = field_counter + 1;
                question_num.push(field.id);
            }
        });
        /**
         * Loop through the input fields that will be submitted
         */
        this.input.forEach(function (field) {
            field.forEach(function (item) {
                var str = 'index';
                if (item.includes(str)) {
                    input_num.push(parseInt(item.replace('index_', '')));
                }
            });
        });
        //console.log(question_num);
        //console.log(input_num);
        /**
         * Run the checker to see which fields are missing
         */
        var missing_num = this.checkDiff(question_num, input_num);
        console.log(missing_num);
        /**
         * Create the missing input message
         */
        missing_num.forEach(function (item) {
            var n_item = item + ',';
            missing_input = missing_input + ' ' + n_item;
        });
        missing_input = missing_input.replace(/,\s*$/, "");
        //console.log(missing_input);
        /**
         * Determine if the input number is the same, if not
         * then show error, if the same submit to the api.
         */
        if (this.input.length < field_counter) {
            var alert_2 = this.alertCtrl.create({
                title: 'Quiz Form Error',
                subTitle: 'Please complete quiz form on number ' + missing_input + '.',
                buttons: ['OK']
            });
            alert_2.present();
        }
        else {
            var loader_1 = this.loadingCtrl.create({ duration: 10000 });
            var apiData_1 = {
                'user': this.userService.userId,
                'data': this.input
            };
            loader_1.present().then(function () {
                _this.apiService.postQuizResponse(_this.tool_form.id, apiData_1).subscribe(function (data) {
                    console.log(data);
                    loader_1.dismiss();
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__results_results__["a" /* ResultsPage */], { 'tool_form': _this.tool_form, 'type': _this.tool.post_type });
                }, function (error) { return console.log(error); });
            });
        }
    };
    ToolPage.prototype.checkDiff = function (first, second) {
        for (var i = 0; i < second.length; i++) {
            var index = undefined;
            while ((index = first.indexOf(second[i])) !== -1) {
                first.splice(index, 1);
            }
        }
        return first;
    };
    ToolPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tool',template:/*ion-inline-start:"D:\Ionic\lifestreet_mobile_app\src\pages\tool\tool.html"*/'<ion-header>\n\n    <ion-navbar color="navbar">\n\n        <ion-buttons end>\n\n            <button menuToggle ion-button icon-only>\n\n                <ion-icon name="menu"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n        <ion-title style="text-align: center;">\n\n            <img style="padding-top: 20px;" alt="logo" width="200px" height="70%" src="assets/images/lifestreet_home_logo.jpg">\n\n        </ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content cache-view="false" style="background-color: #7FA347;">\n\n    <div style="width: 100%;">\n\n        <img width="100%" src="assets/images/tool_heading.jpg"/>\n\n    </div>\n\n    <div class="tool-description">\n\n        <h3 style="text-align: center; font-size: 4vw">{{ tool.post_title }}</h3>\n\n        <p style="font-size: 3.5vw; white-space: pre-wrap" [innerHTML]="tool_page_description"></p>\n\n    </div>\n\n    <div style="text-align: left; background-color: #DCDDDE; padding-top: 2.5%" *ngIf="tool_form"> \n\n    <div>\n\n        <form #f="ngForm">\n\n            <ion-list *ngFor="let field of tool_form.fields; let i = index">\n\n                <!-- TYPE == SECTION -->\n\n                <ion-item *ngIf="field.type == \'section\'">\n\n                    <ion-label style="font-size: 3vw">{{ field.label }}</ion-label>\n\n                </ion-item>\n\n                <!-- TYPE == TEXT -->\n\n                <ion-item *ngIf="field.type == \'text\'">\n\n                    <ion-label style="font-size:3vw">{{ field.label }}</ion-label>\n\n                    <ion-input type="text"></ion-input><br />\n\n                </ion-item>\n\n                <!-- TYPE == TEXT-AREA -->\n\n                <ion-item *ngIf="field.type == \'textarea\'">\n\n                    <ion-label style="font-size: 3vw">{{ field.label }}</ion-label>\n\n                    <ion-textarea></ion-textarea><br />\n\n                </ion-item>\n\n                <!-- TYPE == LIST -->\n\n                <ion-list *ngIf="field.type == \'list\'" radio-group>\n\n                    <ion-list-header style="background-color: #DCDDDE">\n\n                        <p style="white-space: normal; font-size: 4vw">{{ field.label }}</p>\n\n                    </ion-list-header>\n\n                    <ion-item *ngFor="let choice of field.choices">\n\n                        <ion-label style="font-size: 3vw">{{ choice.text }}</ion-label>\n\n                        <ion-radio [value]="choice.value" (ionSelect)="onChange(choice.value,field.id)"></ion-radio>\n\n                    </ion-item>\n\n                </ion-list>\n\n                <!-- TYPE == SELECT -->\n\n                <ion-list *ngIf="field.type == \'select\'" radio-group>\n\n                    <ion-list-header style="background-color: #DCDDDE">\n\n                        <p style="white-space: normal; font-size: 4vw">{{ field.label }}</p>\n\n                    </ion-list-header>\n\n                    <ion-item *ngFor="let choice of field.choices">\n\n                        <ion-label style="font-size: 3vw">{{ choice.text }}</ion-label>\n\n                        <ion-radio value="{{ choice.value }}"></ion-radio>\n\n                    </ion-item>\n\n                </ion-list>\n\n                <!-- TYPE == RADIO -->\n\n                <ion-list *ngIf="field.type == \'radio\'" radio-group>\n\n                    <ion-list-header style="background-color: #DCDDDE">\n\n                        <p style="white-space: normal; font-size: 4vw">{{ field.label }}</p>\n\n                    </ion-list-header>\n\n                    <ion-item *ngFor="let choice of field.choices">\n\n                        <ion-label style="font-size: 3vw">{{ choice.text }}</ion-label>\n\n                        <ion-radio [value]="choice.value" (ionSelect)="onChange(choice.value,field.id)"></ion-radio>\n\n                    </ion-item>\n\n                </ion-list>\n\n                <!-- TYPE == QUIZ -->\n\n                <ion-list [style.padding-bottom]="getPaddingBottom(i)" [style.padding-top]="getPaddingTop(i)" [style.background-color]="getStyle(i)" *ngIf="field.type == \'quiz\' && field.inputType == \'radio\'" radio-group>\n\n                        <h6 style="white-space: normal; font-size: 4vw; padding-left: 2.5%; padding-right: 2.5%;">{{ field.label }}</h6>\n\n                        <ion-item [style.background-color]="getStyle(i)" *ngFor="let choice of field.choices">\n\n                            <ion-label style="font-size: 3vw">{{ choice.text }}</ion-label>\n\n                            <ion-radio [value]="choice.value" (ionSelect)="onChange(choice.value,field.id)"></ion-radio>\n\n                        </ion-item>\n\n                </ion-list>\n\n            </ion-list>\n\n        </form>\n\n    </div>\n\n</div>\n\n    <div>\n\n        <div class="submit-button">\n\n            <button ion-button style="color: #58595B; font-weight: bold; font-size: 4vw; padding-top: 4.5%; padding-bottom:6%; height: 10vw;" ion-button clear full (click)="onSubmit()">SUBMIT</button>\n\n        </div>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Ionic\lifestreet_mobile_app\src\pages\tool\tool.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__app_services_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_3__app_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_5__app_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], ToolPage);
    return ToolPage;
}());

//# sourceMappingURL=tool.js.map

/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResultsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_user_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_api_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_services_auth_service__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ResultsPage = /** @class */ (function () {
    function ResultsPage(navCtrl, navParams, apiService, userService, authService, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.apiService = apiService;
        this.userService = userService;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        var loader = this.loadingCtrl.create({ duration: 10000 });
        this.structure = this.navParams.get('tool_form');
        this.tool_type = this.navParams.get('type');
        if (this.tool_type = 'user_tool') {
            this.tool_post = JSON.parse(localStorage.getItem('user_tool')).data;
        }
        else {
            this.tool_post = JSON.parse(localStorage.getItem('tool')).data;
        }
        //console.log(this.tool_post);
        //console.log(this.structure)
        loader.present().then(function () {
            _this.apiService.userFormResults(_this.userService.userId, _this.structure.id).subscribe(function (data) {
                console.log(data.data);
                _this.result = data.data;
                _this.type = data.data.type;
            }, function (error) { return console.log(error); });
            _this.apiService.post(_this.tool_post.ID).subscribe(function (data) {
                var tool_post_meta = data.data.meta;
                tool_post_meta.forEach(function (meta) {
                    if (meta.meta_key == 'tool_results_description') {
                        _this.tool_result_description = meta.meta_value;
                        console.log(_this.tool_result_description);
                    }
                });
                loader.dismiss();
            }, function (error) { return console.log(error); });
            loader.dismiss();
        });
    }
    ResultsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ResultsPage');
    };
    ResultsPage.prototype.backToHome = function () {
        this.navCtrl.popToRoot();
    };
    ResultsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-results',template:/*ion-inline-start:"D:\Ionic\lifestreet_mobile_app\src\pages\results\results.html"*/'<ion-header>\n\n  <ion-navbar color="navbar" hideBackButton>\n\n    <ion-buttons end>\n\n        <button menuToggle ion-button icon-only>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n    <ion-title style="text-align: center;">\n\n        <img style="padding-top: 20px;" alt="logo" width="200px" height="70%" src="assets/images/lifestreet_home_logo.jpg">\n\n    </ion-title>\n\n</ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content style="background-color: #7FA347;">\n\n    <div style="width: 100%;">\n\n        <img width="100%" src="assets/images/tool_heading.jpg"/>\n\n    </div>\n\n  <div class="result-group">\n\n    <h2 class="result-text1">{{ structure?.title }}</h2>\n\n    <div class="result-desc-div">\n\n        <p style="font-size: 4vw" [innerHTML]="tool_result_description"></p>\n\n    </div>\n\n  </div>\n\n  <div style="background-color: #DCDDDE;">\n\n    <div style="padding: 2.5%; font-size: 3.5vw; white-space: pre-wrap" [innerHTML]="result?.assessment_group_results"></div>\n\n    <div style="padding: 2.5%; font-size: 3.5vw; white-space: pre-wrap" [innerHTML]="result?.individual_results"></div>\n\n  </div>\n\n  <!--<div *ngIf="resultType() === false" class="div-results">\n\n      <h3 style="font-size: 5vw"><b>Overall Results - </b> {{ result?.score }}</h3>\n\n      <h6 style="font-size: 4vw"><b>Result:</b> {{ result?.result_text }}</h6>\n\n      <p style="font-size: 4vw">{{ result?.result_description }}</p>\n\n  </div>\n\n  <div *ngIf="resultType() === true" class="div-results">\n\n      <h3 ngIf="result?.type == \'group\'" style="font-size: 5vw">{{ result?.group_name }} - {{ result?.score }}</h3>\n\n      <h6 ngIf="result?.type == \'group\'" style="font-size: 4vw"><b>Result:</b> {{ result?.group_key }}</h6>\n\n      <p  ngIf="result?.type == \'group\'" style="font-size: 4vw">{{ result?.row }}</p>\n\n  </div>-->\n\n  <div class="result-btn-div">\n\n        <button class="result-btn" ion-button clear full (click)="backToHome()">Home</button>\n\n  </div> \n\n</ion-content>\n\n'/*ion-inline-end:"D:\Ionic\lifestreet_mobile_app\src\pages\results\results.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__app_services_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_2__app_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_4__app_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], ResultsPage);
    return ResultsPage;
}());

//# sourceMappingURL=results.js.map

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebinarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__webinar_modal_webinar_modal__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_api_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_services_auth_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_services_user_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__rate_rate__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__connect_presenter_connect_presenter__ = __webpack_require__(321);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Generated class for the WebinarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WebinarPage = /** @class */ (function () {
    function WebinarPage(navCtrl, navParams, apiService, authService, sanitizer, loadingCtrl, modalCtrl, userService, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.apiService = apiService;
        this.authService = authService;
        this.sanitizer = sanitizer;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.userService = userService;
        this.events = events;
        this.webinar = null;
        this.form_structure = null;
        this.form_assessed = false;
        this.webinar = this.navParams.get('webinar');
        // console.log(this.webinar.post_type);
        this.loader = this.loadingCtrl.create({ duration: 10000 });
        this.loader.present().then(function () {
            _this.apiService.postForm(23).subscribe(function (data) {
                console.log(data.data.structure);
                _this.rate_form = data.data.structure;
            }, function (error) {
                console.log(error);
                _this.hideLoader();
            });
            _this.apiService.postForm(_this.webinar.form.id).subscribe(function (data) {
                _this.form_structure = data.data.structure;
            }, function (error) {
                console.log(error);
                _this.hideLoader();
            });
            var uid = localStorage.getItem('userID');
            _this.apiService.userForm(uid, _this.webinar.form.id).subscribe(function (data) {
                _this.form_assessed = data.data;
                _this.userService.userWebinarFormAssessed(data.data);
                _this.hideLoader();
            }, function (error) {
                console.log(error);
                _this.hideLoader();
            });
        });
    }
    WebinarPage.prototype.goToConnect = function () {
        var type = this.webinar.post_type == 'user_webinar' ? 'user_webinar' : 'webinar';
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__connect_presenter_connect_presenter__["a" /* ConnectPresenterPage */], { 'type': type });
    };
    WebinarPage.prototype.ionViewDidLoad = function () {
    };
    WebinarPage.prototype.ionViewWillEnter = function () {
        // notify app home to check service again
        this.events.publish('app:checkservice');
        this.prepareUrl();
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            duration: 10000
        });
        if (this.form_assessed) {
            this.loading.present();
        }
    };
    WebinarPage.prototype.prepareUrl = function () {
        var randomhash = Math.random().toString(36).substring(7);
        var url = this.webinar.video + '?hash=' + randomhash;
        var santizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.webinar_video = santizedUrl;
    };
    WebinarPage.prototype.ionViewWillLeave = function () {
        this.form_assessed = false;
        this.hideLoader();
    };
    WebinarPage.prototype.doRefresh = function (refresher) {
        this.loader = this.loadingCtrl.create({ duration: 1000 });
        this.loader.present();
        this.prepareUrl();
        refresher.complete();
    };
    WebinarPage.prototype.handleIFrameLoadEvent = function () {
        this.hideLoader();
    };
    /*youtubeURL() {
      this.webinar_video = this.sanitizer.bypassSecurityTrustResourceUrl(this.webinar.video);
      // console.log(this.webinar_video);
      return this.webinar_video;
    }*/
    WebinarPage.prototype.register = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__webinar_modal_webinar_modal__["a" /* WebinarModalPage */], { 'form': this.form_structure });
    };
    WebinarPage.prototype.userFormAssessed = function () {
        return this.userService.getUserWebinarFormAssessed();
    };
    WebinarPage.prototype.ratePresenter = function () {
        var type = this.webinar.post_type == 'user_webinar' ? 'user_webinar' : 'webinar';
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__rate_rate__["a" /* RatePage */], { 'rate': this.rate_form, 'type': type });
    };
    WebinarPage.prototype.hideLoader = function () {
        if (this.loader != null) {
            this.loader.dismiss();
            this.loader = null;
        }
        if (this.loading != null) {
            this.loading.dismiss();
            this.loading = null;
        }
    };
    WebinarPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-webinar',template:/*ion-inline-start:"D:\Ionic\lifestreet_mobile_app\src\pages\webinar\webinar.html"*/'<ion-header>\n\n  <ion-navbar color="navbar">\n\n    <ion-buttons end>\n\n        <button menuToggle ion-button icon-only>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n  <ion-title style="text-align: center;">\n\n    <img style="padding-top: 20px;" alt="logo" width="200px" height="70%" src="assets/images/lifestreet_home_logo.jpg">\n\n  </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content cache-view="false" class="webinar-content">\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n      <ion-refresher-content pullingText="Pull to refresh..." refreshingText="Refreshing...">\n\n      </ion-refresher-content>\n\n  </ion-refresher>\n\n  \n\n  <div class="webinar-img">\n\n    <img width="100%" src="assets/images/watch_logo_slice.jpg"/>\n\n  </div>\n\n  <div style="margin-top:-4px;">\n\n    <div class="webinar-container">\n\n        <div class="webinar-data" >\n\n            <h3 class="webinar-data-h3" >{{ webinar.post_title }}</h3>\n\n            <p style="font-size: 3.5vw" style="white-space: pre-wrap" [innerHTML]="webinar?.about"></p>\n\n            <p style="font-size: 3.5vw" style="white-space: pre-wrap" [innerHTML]="webinar?.presenter"></p>\n\n        </div>\n\n        <div *ngIf="userFormAssessed() == \'true\'" style="background-color: #7fa347;">\n\n            <iframe \n\n                width="100%" \n\n                height="500" \n\n                [src]="webinar_video ? webinar_video : null"\n\n                (load)="webinar_video ? handleIFrameLoadEvent() : null"\n\n                border="0"\n\n            ></iframe>\n\n        </div>\n\n      </div>\n\n    <div *ngIf="userFormAssessed() == \'true\'" class="webinar-action-btn">\n\n        <div class="rate-button">\n\n            <!--<button ion-button color="danger" (click)="register()">Register Now To Access this Event</button>-->\n\n            <button style="color: black" ion-button clear full (click)="ratePresenter()"></button>\n\n        </div>\n\n        <div class="contact-button">\n\n            <button style="color: black" ion-button clear full (click)="goToConnect()"></button>\n\n        </div>\n\n    </div>\n\n  </div>\n\n\n\n  <div class="webinar-register-access" *ngIf="userFormAssessed() == \'false\'">\n\n    <div *ngIf="form_structure" class="register-button">\n\n        <!--<button ion-button color="danger" (click)="register()">Register Now To Access this Event</button>-->\n\n        <button style="color: #58595B; font-weight: bold; font-size: 4vw" ion-button clear full (click)="register()">REGISTER NOW TO ACCESS</button>\n\n    </div>\n\n\n\n  </div>\n\n  \n\n</ion-content>\n\n'/*ion-inline-end:"D:\Ionic\lifestreet_mobile_app\src\pages\webinar\webinar.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__app_services_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_4__app_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_5__app_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], WebinarPage);
    return WebinarPage;
}());

//# sourceMappingURL=webinar.js.map

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebinarModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_user_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_api_service__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WebinarModalPage = /** @class */ (function () {
    function WebinarModalPage(navCtrl, navParams, viewCtrl, userService, apiService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.userService = userService;
        this.apiService = apiService;
        this.loadingCtrl = loadingCtrl;
        this.input = [];
        this.form = this.navParams.get('form');
        console.log(this.form);
        console.log(this.userService.userId);
    }
    WebinarModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WebinarModalPage');
    };
    WebinarModalPage.prototype.closeModal = function () {
        var _this = this;
        //console.log(JSON.stringify(this.input));
        var loader = this.loadingCtrl.create({ duration: 10000 });
        loader.present().then(function () {
            _this.apiService.postFormResponse(_this.form.id, { 'user': _this.userService.userId, 'data': _this.input }).subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
            _this.userService.userWebinarFormAssessed(true);
            _this.navCtrl.pop();
            loader.dismiss();
        });
    };
    WebinarModalPage.prototype.onChange = function (choice, index) {
        console.log(choice + ' ' + index);
        this.input.push(choice);
    };
    WebinarModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-webinar-modal',template:/*ion-inline-start:"D:\Ionic\lifestreet_mobile_app\src\pages\webinar-modal\webinar-modal.html"*/'<ion-header>\n\n    <ion-navbar color="navbar">\n\n        <ion-buttons end>\n\n            <button menuToggle ion-button icon-only>\n\n                <ion-icon name="menu"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n      <ion-title style="text-align: center;">\n\n        <img style="padding-top: 20px;" alt="logo" width="200px" height="70%" src="assets/images/lifestreet_home_logo.jpg">\n\n      </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content class="webinar-modal-content">\n\n  <div class="webinar-modal-img">\n\n    <img width="100%" src="assets/images/watch_logo_slice.jpg"/>\n\n  </div>\n\n  <div class="webinar-modal-form" *ngIf="form">\n\n    <h5 style="text-align: center;">{{ form.title }}</h5>\n\n    <p>{{ form.description }}</p>\n\n    <div>\n\n        <form #f="ngForm">\n\n          <ion-list *ngFor="let field of form.fields; let i of index">\n\n            <!-- TYPE == SECTION -->\n\n            <ion-item *ngIf="field.type == \'section\'">\n\n                <ion-label>{{ field.label }}</ion-label>\n\n            </ion-item>\n\n            <!-- TYPE == TEXT -->\n\n            <ion-item *ngIf="field.type == \'text\'">\n\n                <ion-label>{{ field.label }}</ion-label>\n\n                <ion-input type="text"></ion-input><br />\n\n            </ion-item>\n\n            <!-- TYPE == TEXT-AREA -->\n\n            <ion-item *ngIf="field.type == \'textarea\'">\n\n                <ion-label>{{ field.label }}</ion-label>\n\n                <ion-textarea></ion-textarea><br />\n\n            </ion-item>\n\n            \n\n            <!--<ion-item *ngIf="field.type == \'radio\'">\n\n                <!--<ion-list radio-group>\n\n                    <ion-list-header>\n\n                        <p style="white-space: normal;">{{ field.label }}</p>\n\n                    </ion-list-header>       \n\n                    <!--<ion-item *ngFor="let choice of field.choices">\n\n                        <ion-label>{{ choice }}</ion-label>\n\n                        <ion-radio value="{{ choice }}"></ion-radio>\n\n                    </ion-item>\n\n                </ion-list>\n\n                    <ion-label>\n\n                        <p style="white-space: normal;">{{ field.label }}</p>\n\n                    </ion-label>\n\n                    <ion-select>\n\n                        <ion-option *ngFor="let choice of field.choices" value="{{ choice.value }}">{{ choice.text }}</ion-option>\n\n                    </ion-select>\n\n            </ion-item>-->\n\n            \n\n            <!-- TYPE == QUIZ -->\n\n            <ion-list *ngIf="field.type == \'quiz\' && field.inputType == \'radio\'" radio-group>\n\n                    <ion-list-header style="background-color: #DCDDDE">\n\n                        <p style="white-space: normal;">{{ field.label }}</p>\n\n                    </ion-list-header>\n\n                    <ion-item *ngFor="let choice of field.choices;">\n\n                        <ion-label>{{ choice.text }}</ion-label>\n\n                        <ion-radio  [value]="choice.value" (ionSelect)="onChange(choice.value,field.id)"></ion-radio>\n\n                    </ion-item><br />\n\n            </ion-list>\n\n\n\n            <!-- TYPE == LIST -->\n\n            <br/><ion-list *ngIf="field.type == \'list\'" radio-group>\n\n                    <ion-list-header style="background-color: #DCDDDE">\n\n                        <p style="white-space: normal;">{{ field.label }}</p>\n\n                    </ion-list-header>\n\n                    <ion-item *ngFor="let choice of field.choices">\n\n                        <ion-label>{{ choice.text }}</ion-label>\n\n                        <ion-radio  [value]="choice.value" (ionSelect)="onChange(choice.value,field.id)"></ion-radio>\n\n                    </ion-item><br />\n\n            </ion-list>\n\n\n\n            <!-- TYPE == SELECT -->\n\n            <ion-list *ngIf="field.type == \'select\'" radio-group>\n\n                    <ion-list-header style="background-color: #DCDDDE"> \n\n                        <p style="white-space: normal;">{{ field.label }}</p>\n\n                    </ion-list-header>\n\n                    <ion-item *ngFor="let choice of field.choices">\n\n                        <ion-label>{{ choice.text }}</ion-label>\n\n                        <ion-radio value="{{ choice.value }}"></ion-radio>\n\n                    </ion-item><br />\n\n            </ion-list>\n\n\n\n            <!-- TYPE == RADIO -->\n\n            <br/><ion-list>\n\n                <ion-list *ngIf="field.type == \'radio\'" radio-group>\n\n                    <ion-list-header style="background-color: #DCDDDE">\n\n                        <p style="white-space: normal;">{{ field.label }}</p>\n\n                    </ion-list-header>\n\n                        <ion-item *ngFor="let choice of field.choices">\n\n                            <ion-label>{{ choice.text }}</ion-label>\n\n                            <ion-radio [value]="choice.value" (ionSelect)="onChange(choice.value,field.id)"></ion-radio>\n\n                        </ion-item><br />\n\n                    </ion-list>\n\n            </ion-list>\n\n          </ion-list>\n\n        </form>\n\n    </div>\n\n    \n\n  </div>\n\n\n\n  <div class="watch-button">\n\n    <button style="color: #58595B; padding-top:5%; padding-bottom:5%; font-size: 4vw; font-weight: bold" ion-button clear full (click)="closeModal()">WATCH NOW</button>\n\n  </div>\n\n \n\n</ion-content>\n\n'/*ion-inline-end:"D:\Ionic\lifestreet_mobile_app\src\pages\webinar-modal\webinar-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__app_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_3__app_services_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], WebinarModalPage);
    return WebinarModalPage;
}());

//# sourceMappingURL=webinar-modal.js.map

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_user_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_api_service__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RatePage = /** @class */ (function () {
    function RatePage(navCtrl, navParams, viewCtrl, userService, apiService, loadingCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.userService = userService;
        this.apiService = apiService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.rate_input = [];
        var loader = this.loadingCtrl.create({ duration: 10000 });
        loader.present().then(function () {
            _this.form = _this.navParams.get('rate');
            _this.type = _this.navParams.get('type');
            _this.home_settings = JSON.parse(localStorage.getItem('home_settings')).data;
            console.log(_this.type);
            // console.log(this.form);
            loader.dismiss();
        });
    }
    RatePage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad RatePage');
    };
    RatePage.prototype.rateNow = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirmation',
            subTitle: 'Thank you.',
            buttons: ['Dismiss']
        });
        // console.log(this.form.id);
        if (this.type == 'user_webinar') {
            var user_webinar = JSON.parse(localStorage.getItem('user_webinar')).data;
            this.rate_input.push(['index_4', user_webinar.post_title]);
        }
        else {
            this.rate_input.push(['index_4', this.home_settings.webinar_title.post_title]);
        }
        var apiData = {
            'user': this.userService.userId,
            'data': this.rate_input
        };
        console.log(apiData);
        var loader = this.loadingCtrl.create({ duration: 10000 });
        loader.present().then(function () {
            _this.apiService.postQuizResponse(_this.form.id, apiData).subscribe(function (data) {
                console.log(data);
                loader.dismiss();
                alert.present();
                _this.viewCtrl.dismiss();
            }, function (error) { return console.log(error); });
        });
    };
    RatePage.prototype.onChoosing = function (choice, index) {
        console.log('index_' + index + ' ' + choice);
        var idx = 'index_' + index;
        var objidx = null;
        this.rate_input.forEach(function (arr, i) {
            if (arr[0] == idx || arr[1] == choice) {
                objidx = i;
            }
        });
        if (objidx !== null && this.rate_input.length > 0) {
            this.rate_input.splice(objidx, 1);
        }
        this.rate_input.push([idx, choice]);
        console.log(this.rate_input);
    };
    RatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-rate',template:/*ion-inline-start:"D:\Ionic\lifestreet_mobile_app\src\pages\rate\rate.html"*/'<ion-header>\n\n    <ion-navbar color="navbar">\n\n        <ion-title style="text-align: center;">\n\n            <img style="padding-top: 20px;" alt="logo" width="200px" height="70%" src="assets/images/lifestreet_home_logo.jpg">\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content class="rate-content">\n\n    <div class="rate-img">\n\n        <img width="100%" src="assets/images/watch_logo_slice.jpg"/>\n\n    </div>\n\n    <div class="rate-description">\n\n        <h3 class="rate-text">{{ form?.title }}</h3>\n\n    </div>\n\n    <div class="rate-form-group">\n\n        <div class="form-group" *ngIf="form">\n\n        <form #f="ngForm">\n\n        <ion-list *ngFor="let field of form.fields">\n\n        <ion-list *ngIf="field.type == \'survey\'" radio-group>\n\n        <ion-list-header>\n\n            <p style="white-space: normal; font-size: 5vw">{{ field.label }}</p>\n\n        </ion-list-header>\n\n        <ion-item *ngFor="let choice of field.choices">\n\n        <ion-label style="font-size: 4vw">{{ choice.text }}</ion-label>\n\n        <ion-radio value="{{ choice.value }}" (ionSelect)="onChoosing(choice.value,field.id)"></ion-radio>\n\n        </ion-item>\n\n        </ion-list>\n\n        </ion-list> <!-- form fields -->\n\n        </form> <!-- form -->\n\n    </div> <!-- form group -->\n\n    </div> <!-- container -->\n\n    <div class="rate-presenter-button">\n\n        <button style="color: #58595B; padding-top: 5%; padding-bottom:4%; font-size: 4vw; font-weight: bold" ion-button clear full (click)="rateNow()">SUBMIT</button>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Ionic\lifestreet_mobile_app\src\pages\rate\rate.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__app_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_3__app_services_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], RatePage);
    return RatePage;
}());

//# sourceMappingURL=rate.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectPresenterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_api_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_auth_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_services_user_service__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ConnectPresenterPage = /** @class */ (function () {
    function ConnectPresenterPage(navCtrl, navParams, apiService, authService, userService, loadingCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.apiService = apiService;
        this.authService = authService;
        this.userService = userService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.webinar_type = this.navParams.get('type');
        console.log(this.webinar_type);
        this.home_settings = JSON.parse(localStorage.getItem('home_settings')).data;
        var loader = this.loadingCtrl.create({ duration: 10000 });
        loader.present().then(function () {
            _this.apiService.post(7056).subscribe(function (data) {
                console.log(data.data);
                _this.connect_post = data.data;
            }, function (error) { return console.log(error); });
            _this.apiService.postForm(36).subscribe(function (data) {
                console.log(data.data.structure);
                _this.connect_presenter = data.data.structure;
                loader.dismiss();
            }, function (error) { return console.log(error); });
        });
        this.input = {
            subject: '',
            message: '',
            email: '',
            phone: ''
        };
    }
    ConnectPresenterPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad ConnectPresenterPage');
    };
    ConnectPresenterPage.prototype.submitConnectPresenter = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirmation',
            subTitle: 'Thanks for contacting us! We will get in touch with you shortly.',
            buttons: ['Dismiss']
        });
        //console.log(this.contact);
        //console.log(this.input);
        //console.log(this.connect_presenter.id);
        var data_input = [];
        if (this.contact == 'Email') {
            data_input.push(['index_3', this.input.email]);
        }
        else {
            data_input.push(['index_3', '']);
        }
        if (this.contact == 'Phone') {
            data_input.push(['index_4', this.input.phone]);
        }
        else {
            data_input.push(['index_4', '']);
        }
        data_input.push(['index_1', '']);
        data_input.push(['index_7', this.contact]);
        data_input.push(['index_3', this.input.email]);
        data_input.push(['index_5', this.input.subject]);
        data_input.push(['index_6', this.input.message]);
        if (this.webinar_type == 'user_webinar') {
            var user_webinar = JSON.parse(localStorage.getItem('user_webinar')).data;
            console.log(user_webinar);
            data_input.push(['index_8', user_webinar.post_title]);
        }
        else {
            data_input.push(['index_8', this.home_settings.webinar_title.post_title]);
        }
        var loader = this.loadingCtrl.create({ duration: 10000 });
        //console.log(data_input);
        var apiData = {
            'user': this.userService.userId,
            'data': data_input
        };
        // Updated Checker
        if (this.input.message && this.contact == 'Phone' && this.input.phone) {
            var re = /^[0-9-()+ ]+$/;
            //console.log(re.test(String(this.input.phone).toLowerCase()));
            if (!re.test(String(this.input.phone).toLowerCase())) {
                var alert_1 = this.alertCtrl.create({
                    title: 'Contact Form Error',
                    subTitle: 'Please enter a valid phone number',
                    buttons: ['OK']
                });
                alert_1.present();
            }
            else {
                loader.present().then(function () {
                    _this.apiService.postQuizResponse(_this.connect_presenter.id, apiData).subscribe(function (data) {
                        // console.log(data);
                        loader.dismiss();
                        alert.present();
                        _this.navCtrl.pop();
                    }, function (error) { return console.log(error); });
                });
            }
        }
        else if (this.input.message && this.contact == 'Email' && this.input.email) {
            var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            //console.log(regex.test(String(this.input.email).toLowerCase()));
            if (!regex.test(String(this.input.email).toLowerCase())) {
                var alert_2 = this.alertCtrl.create({
                    title: 'Contact Form Error',
                    subTitle: 'Please enter a valid email address',
                    buttons: ['OK']
                });
                alert_2.present();
            }
            else {
                loader.present().then(function () {
                    _this.apiService.postQuizResponse(_this.connect_presenter.id, apiData).subscribe(function (data) {
                        console.log(data);
                        loader.dismiss();
                        alert.present();
                        _this.navCtrl.pop();
                    }, function (error) { return console.log(error); });
                });
            }
        }
        else if (!this.contact && !this.input.message) {
            var alert_3 = this.alertCtrl.create({
                title: 'Contact Form Error',
                subTitle: 'Please fill out form',
                buttons: ['OK']
            });
            alert_3.present();
        }
        else if (this.input.message && !this.contact) {
            var alert_4 = this.alertCtrl.create({
                title: 'Contact Form Error',
                subTitle: 'Please choose how you would like to be contacted',
                buttons: ['OK']
            });
            alert_4.present();
        }
        else if (!this.input.message && this.contact == 'Email' && !this.input.email) {
            var alert_5 = this.alertCtrl.create({
                title: 'Contact Form Error',
                subTitle: 'Email and Message required',
                buttons: ['OK']
            });
            alert_5.present();
        }
        else if (this.input.message && this.contact == 'Email' && !this.input.email) {
            var alert_6 = this.alertCtrl.create({
                title: 'Contact Form Error',
                subTitle: 'Email required',
                buttons: ['OK']
            });
            alert_6.present();
        }
        else if (!this.input.message && this.contact == 'Phone' && !this.input.phone) {
            var alert_7 = this.alertCtrl.create({
                title: 'Contact Form Error',
                subTitle: 'Phone and Message required',
                buttons: ['OK']
            });
            alert_7.present();
        }
        else if (this.input.message && this.contact == 'Phone' && !this.input.phone) {
            var alert_8 = this.alertCtrl.create({
                title: 'Contact Form Error',
                subTitle: 'Phone required',
                buttons: ['OK']
            });
            alert_8.present();
        }
        else if (!this.input.message && this.contact == 'Phone' && this.input.phone) {
            var alert_9 = this.alertCtrl.create({
                title: 'Contact Form Error',
                subTitle: 'Message required',
                buttons: ['OK']
            });
            alert_9.present();
        }
        else if (!this.input.message && this.contact == 'Email' && this.input.email) {
            var alert_10 = this.alertCtrl.create({
                title: 'Contact Form Error',
                subTitle: 'Message required',
                buttons: ['OK']
            });
            alert_10.present();
        }
        else {
            loader.present().then(function () {
                _this.apiService.postQuizResponse(_this.connect_presenter.id, apiData).subscribe(function (data) {
                    console.log(data);
                    loader.dismiss();
                    alert.present();
                    _this.navCtrl.pop();
                }, function (error) { return console.log(error); });
            });
        }
    };
    ConnectPresenterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-connect-presenter',template:/*ion-inline-start:"D:\Ionic\lifestreet_mobile_app\src\pages\connect-presenter\connect-presenter.html"*/'<ion-header>\n\n    <ion-navbar color="navbar">\n\n        <ion-buttons end>\n\n            <button menuToggle ion-button icon-only>\n\n                <ion-icon name="menu"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n        <ion-title style="text-align: center;">\n\n            <img style="padding-top: 20px;" alt="logo" width="200px" height="70%" src="assets/images/lifestreet_home_logo.jpg">\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="connect-content">\n\n    <div class="ask-div">\n\n        <img width="100%" src="assets/images/connect_logo.jpg"/>\n\n    </div>\n\n    <div style="margin-top: -25px; background-color: #DCDDDE">\n\n        <div class="connect-presenter-desc-div">\n\n            <br />\n\n            <h3 class="connect-text1">{{ connect_presenter?.title }}</h3>\n\n            <p class="connect-text" style="white-space: pre-wrap" [innerHTML]="connect_post?.post_content"></p>\n\n        </div>\n\n        <div class="div-form-group" *ngIf="connect_presenter">\n\n        <div class="form-group">\n\n            <form #f="ngForm">\n\n                <ion-list *ngFor="let field of connect_presenter.fields">\n\n                    <ion-list *ngIf="field.type == \'select\'" radio-group>\n\n                        <ion-list-header style="background-color: #DCDDDE">\n\n                            <p style="white-space: normal; font-size: 2.5vw">{{ field.label }}</p>\n\n                        </ion-list-header>\n\n                        <ion-item>\n\n                            <ion-select required name="contact-option" [(ngModel)]="contact">\n\n                                <ion-option *ngFor="let choice of field.choices" value="{{ choice.value }}">{{ choice.text }}</ion-option>\n\n                            </ion-select>\n\n                        </ion-item>\n\n                    </ion-list>\n\n                </ion-list>\n\n                <ion-item>\n\n                    <ion-input *ngIf="contact == \'Email\'" name="email" [(ngModel)]="input.email" placeholder="Email" required></ion-input>\n\n                    <ion-input *ngIf="contact == \'Phone\'" name="phone" [(ngModel)]="input.phone" placeholder="Phone" required></ion-input>\n\n                </ion-item><br />\n\n                <!--<ion-item>\n\n                    <ion-input name="subject" [(ngModel)]="input.subject" placeholder="Subject" required></ion-input>\n\n                </ion-item> <br />-->\n\n                <ion-item>\n\n                    <ion-textarea name="message" [(ngModel)]="input.message" style="height: 100%" placeholder="Message" required></ion-textarea>\n\n                </ion-item>\n\n            </form>\n\n        </div> <!-- form group -->\n\n    </div> <!-- connect form -->\n\n    </div> <!-- connect data group -->\n\n    <div class="connect-presenter">\n\n        <button class="connect-presenter-btn" ion-button clear full (click)="submitConnectPresenter()">SUBMIT</button>\n\n    </div> <!-- connect presenter-->\n\n    <!--<div class="book-in">\n\n      <button class="connect-presenter-btn" ion-button clear full (click)="submitConnectPresenter()">CONNECT WITH PRESENTER</button>\n\n    </div> book in button-->\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Ionic\lifestreet_mobile_app\src\pages\connect-presenter\connect-presenter.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__app_services_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_3__app_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_4__app_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ConnectPresenterPage);
    return ConnectPresenterPage;
}());

//# sourceMappingURL=connect-presenter.js.map

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_api_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_auth_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_services_user_service__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ConnectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ConnectPage = /** @class */ (function () {
    function ConnectPage(navCtrl, navParams, apiService, authService, userService, loadingCtrl, alertCtrl, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.apiService = apiService;
        this.authService = authService;
        this.userService = userService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.events = events;
        var loader = this.loadingCtrl.create({ duration: 10000 });
        loader.present().then(function () {
            _this.apiService.post(7096).subscribe(function (data) {
                console.log(data.data);
                _this.ask_post = data.data.structure;
            }, function (error) { return console.log(error); });
            _this.apiService.postForm(37).subscribe(function (data) {
                console.log(data.data.structure);
                _this.connect_form = data.data.structure;
                loader.dismiss();
            }, function (error) {
                console.log(error);
                loader.dismiss();
            });
        });
        this.input = {
            subject: '',
            message: '',
            email: '',
            phone: ''
        };
    }
    ConnectPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ConnectPage');
    };
    ConnectPage.prototype.ionViewWillEnter = function () {
        // notify app home to check service again
        this.events.publish('app:checkservice');
    };
    ConnectPage.prototype.optionsFn = function () {
        console.log(this.contact);
    };
    ConnectPage.prototype.submitConnect = function () {
        var _this = this;
        // prevent form from submitting when there is no form id provided
        if (!this.connect_form) {
            var alert_1 = this.alertCtrl.create({
                title: 'Contact Form Error',
                subTitle: '<br><small>[ERROR][APP] A401</small><br> Cannot submit now <br><br> <b>Please try to refresh the page.</b>',
                buttons: ['OK']
            });
            alert_1.present();
            return;
        }
        var alert = this.alertCtrl.create({
            title: 'Confirmation',
            subTitle: 'Thanks for contacting us! We will get in touch with you shortly.',
            buttons: ['Dismiss']
        });
        console.log(this.contact);
        console.log(this.input);
        console.log(this.connect_form.id);
        var data_input = [];
        data_input.push(['index_1', '']);
        data_input.push(['index_7', this.contact]);
        if (this.contact == 'Email') {
            data_input.push(['index_3', this.input.email]);
        }
        else {
            data_input.push(['index_3', '']);
        }
        if (this.contact == 'Phone') {
            data_input.push(['index_4', this.input.phone]);
        }
        else {
            data_input.push(['index_4', '']);
        }
        data_input.push(['index_5', '']);
        data_input.push(['index_6', this.input.message]);
        data_input.push(['index_8', '']);
        var loader = this.loadingCtrl.create({ duration: 10000 });
        var apiData = {
            'user': this.userService.userId,
            'data': data_input
        };
        //console.log(this.input.subject == '');
        if (this.input.message && this.contact == 'Phone' && this.input.phone) {
            var re = /^[0-9-()+ ]+$/;
            console.log(re.test(String(this.input.phone).toLowerCase()));
            if (!re.test(String(this.input.phone).toLowerCase())) {
                var alert_2 = this.alertCtrl.create({
                    title: 'Contact Form Error',
                    subTitle: 'Please enter a valid phone number',
                    buttons: ['OK']
                });
                alert_2.present();
            }
            else {
                loader.present().then(function () {
                    _this.apiService.postQuizResponse(_this.connect_form.id, apiData).subscribe(function (data) {
                        console.log(data);
                        loader.dismiss();
                        alert.present();
                        _this.navCtrl.pop();
                    }, function (error) {
                        var alert = _this.alertCtrl.create({
                            title: 'Contact Form Error',
                            subTitle: '<br>[ERROR][APP] A403<br> Fail to contact <br><br> <b>Please try again later.</b>',
                            buttons: ['OK']
                        });
                        alert.present();
                        loader.dismiss();
                        console.log(error);
                    });
                });
            }
        }
        else if (this.input.message && this.contact == 'Email' && this.input.email) {
            var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            console.log(regex.test(String(this.input.email).toLowerCase()));
            if (!regex.test(String(this.input.email).toLowerCase())) {
                var alert_3 = this.alertCtrl.create({
                    title: 'Contact Form Error',
                    subTitle: 'Please enter a valid email address',
                    buttons: ['OK']
                });
                alert_3.present();
            }
            else {
                loader.present().then(function () {
                    _this.apiService.postQuizResponse(_this.connect_form.id, apiData).subscribe(function (data) {
                        console.log(data);
                        loader.dismiss();
                        alert.present();
                        _this.navCtrl.pop();
                    }, function (error) {
                        var alert = _this.alertCtrl.create({
                            title: 'Contact Form Error',
                            subTitle: '<br>[ERROR][APP] A402<br> Fail to contact <br><br> <b>Please try again later.</b>',
                            buttons: ['OK']
                        });
                        alert.present();
                        loader.dismiss();
                        console.log(error);
                    });
                });
            }
        }
        else if (!this.contact && !this.input.message) {
            var alert_4 = this.alertCtrl.create({
                title: 'Contact Form Error',
                subTitle: 'Please fill out form',
                buttons: ['OK']
            });
            alert_4.present();
        }
        else if (this.input.message && !this.contact) {
            var alert_5 = this.alertCtrl.create({
                title: 'Contact Form Error',
                subTitle: 'Please choose how you would like to be contacted',
                buttons: ['OK']
            });
            alert_5.present();
        }
        else if (!this.input.message && this.contact == 'Email' && !this.input.email) {
            var alert_6 = this.alertCtrl.create({
                title: 'Contact Form Error',
                subTitle: 'Email and Message required',
                buttons: ['OK']
            });
            alert_6.present();
        }
        else if (this.input.message && this.contact == 'Email' && !this.input.email) {
            var alert_7 = this.alertCtrl.create({
                title: 'Contact Form Error',
                subTitle: 'Email required',
                buttons: ['OK']
            });
            alert_7.present();
        }
        else if (!this.input.message && this.contact == 'Phone' && !this.input.phone) {
            var alert_8 = this.alertCtrl.create({
                title: 'Contact Form Error',
                subTitle: 'Phone and Message required',
                buttons: ['OK']
            });
            alert_8.present();
        }
        else if (this.input.message && this.contact == 'Phone' && !this.input.phone) {
            var alert_9 = this.alertCtrl.create({
                title: 'Contact Form Error',
                subTitle: 'Phone required',
                buttons: ['OK']
            });
            alert_9.present();
        }
        else if (!this.input.message && this.contact == 'Phone' && this.input.phone) {
            var alert_10 = this.alertCtrl.create({
                title: 'Contact Form Error',
                subTitle: 'Message required',
                buttons: ['OK']
            });
            alert_10.present();
        }
        else if (!this.input.message && this.contact == 'Email' && this.input.email) {
            var alert_11 = this.alertCtrl.create({
                title: 'Contact Form Error',
                subTitle: 'Message required',
                buttons: ['OK']
            });
            alert_11.present();
        }
        else {
            loader.present().then(function () {
                _this.apiService.postQuizResponse(_this.connect_form.id, apiData).subscribe(function (data) {
                    console.log(data);
                    loader.dismiss();
                    alert.present();
                    _this.navCtrl.pop();
                }, function (error) {
                    console.log(error);
                    var alert = _this.alertCtrl.create({
                        title: 'Contact Form Error',
                        subTitle: '<br><small>[ERROR][APP] A400</small><br> Fail to contact <br><br> <b>Please try again later.</b>',
                        buttons: ['OK']
                    });
                    alert.present();
                    loader.dismiss();
                });
            });
        }
    };
    ConnectPage.prototype.bookSchedule = function () {
        //console.log('clicked');
        var user;
        user = JSON.parse(localStorage.getItem('userData'));
        var url = 'https://wellbeing.lifestreet.com.au/booking-calendar-so-app/?Email' + user.user_email + '&Name=' + user.display_name + '&Company=' + user.company;
        window.open(url, '_system', 'location=yes');
    };
    ConnectPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-connect',template:/*ion-inline-start:"D:\Ionic\lifestreet_mobile_app\src\pages\connect\connect.html"*/'<ion-header>\n\n    <ion-navbar color="navbar">\n\n        <ion-buttons end>\n\n            <button menuToggle ion-button icon-only>\n\n                <ion-icon name="menu"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n        <ion-title style="text-align: center;">\n\n            <img style="padding-top: 20px;" alt="logo" width="200px" height="70%" src="assets/images/lifestreet_home_logo.jpg">\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content class="connect-content">\n\n    <div class="ask-div">\n\n        <img width="100%" src="assets/images/ask_slice.jpg"/>\n\n    </div>\n\n    <div style="margin-top: -25px; background-color: #DCDDDE; padding-bottom: 0;">\n\n        <div class="connect-desc-div">\n\n            <br />\n\n            <h3 class="connect-text1">{{ connect_form?.title }}</h3>\n\n            <p class="connect-text" style="white-space: pre-wrap" [innerHTML]="ask_post?.post_content"></p>\n\n        </div>\n\n        <div class="div-form-group" *ngIf="connect_form">\n\n        <div class="form-group">\n\n            <form #f="ngForm">\n\n            <ion-list *ngFor="let field of connect_form.fields">\n\n                <ion-list *ngIf="field.type == \'select\'" radio-group>\n\n                    <ion-list-header style="background-color: #DCDDDE">\n\n                        <p style="white-space: normal; font-size: 2.5vw">{{ field.label }}</p>\n\n                    </ion-list-header>\n\n                    <ion-item>\n\n                        <ion-select required name="contact-option" [(ngModel)]="contact" (ionChange)="optionsFn()">\n\n                            <div *ngFor="let choice of field.choices">\n\n                                <ion-option *ngIf="choice.text" value="{{ choice.value }}">{{ choice.text }}</ion-option>\n\n                            </div>\n\n                        </ion-select>\n\n                    </ion-item>\n\n                </ion-list>\n\n            </ion-list>\n\n            <ion-item>\n\n                <ion-input *ngIf="contact == \'Email\'" name="email" [(ngModel)]="input.email" placeholder="Email" required></ion-input>\n\n                <ion-input *ngIf="contact == \'Phone\'" name="phone" [(ngModel)]="input.phone" placeholder="Phone" required></ion-input>\n\n            </ion-item> <br />\n\n            <!--<ion-item>\n\n                <ion-input name="subject" [(ngModel)]="input.subject" placeholder="Subject" required></ion-input>\n\n            </ion-item> <br /> -->\n\n            <ion-item>\n\n                <ion-textarea name="message" [(ngModel)]="input.message" style="height: 100%" placeholder="Type your question here..."\n\n                    required></ion-textarea>\n\n            </ion-item>\n\n            </form>\n\n        </div> <!-- form group -->\n\n    </div> <!-- connect form -->\n\n    </div> <!-- connect data group -->\n\n    <!--<div class="connect-presenter">\n\n            <button class="connect-presenter-btn" ion-button clear full (click)="bookSchedule()">BOOK IN</button>\n\n    </div>-->\n\n    <div class="connect-div-coach">\n\n        <button class="connect-coach-btn" ion-button clear full (click)="submitConnect()">SUBMIT</button>\n\n    </div> <!-- connect button-->\n\n</ion-content>'/*ion-inline-end:"D:\Ionic\lifestreet_mobile_app\src\pages\connect\connect.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__app_services_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_3__app_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_4__app_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], ConnectPage);
    return ConnectPage;
}());

//# sourceMappingURL=connect.js.map

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the BookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BookingPage = /** @class */ (function () {
    function BookingPage(navCtrl, navParams, sanitizer, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sanitizer = sanitizer;
        this.events = events;
        this.home_settings = JSON.parse(localStorage.getItem('home_settings')).data;
        this.user = JSON.parse(localStorage.getItem('userData'));
        var url = 'https://app.acuityscheduling.com/schedule.php?owner=17156462&appointmentType=9055362&email=' + this.user.user_email
            + '&firstName=' + this.user.firstname
            + '&lastName=' + this.user.lastname
            + '&field:5967886=' + this.user.company
            + '&phone=' + this.user.phone
            + '&field:6118884=' + 'APP'
            + '&field:5967889=' + this.user.unit;
        console.log(url);
        this.home_settings.sanitized_url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    BookingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BookingPage');
    };
    BookingPage.prototype.ionViewWillEnter = function () {
        // notify app home to check service again
        this.events.publish('app:checkservice');
    };
    BookingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-booking',template:/*ion-inline-start:"D:\Ionic\lifestreet_mobile_app\src\pages\booking\booking.html"*/'<ion-header>\n\n  <ion-navbar color="navbar">\n\n      <ion-buttons end>\n\n          <button menuToggle ion-button icon-only>\n\n              <ion-icon name="menu"></ion-icon>\n\n          </button>\n\n      </ion-buttons>\n\n      <ion-title style="text-align: center;">\n\n          <img style="padding-top: 20px;" alt="logo" width="200px" height="70%" src="assets/images/lifestreet_home_logo.jpg">\n\n      </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="booking-container">\n\n  <div class="book-img">\n\n    <img width="100%" src="assets/images/book_head.png"/>\n\n  </div>\n\n  <!--<div>\n\n      <p style="font-size: 4.5vw" style="white-space: normal; text-align: justify; padding-left: 10px; padding-right:10px; padding-bottom:20px; padding-top:10px;"> {{ home_settings?.booking_page_text }}</p>\n\n  </div>-->\n\n  <iframe id="bookFrame" width="100%" height="100%" [src]="home_settings.sanitized_url"></iframe>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Ionic\lifestreet_mobile_app\src\pages\booking\booking.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], BookingPage);
    return BookingPage;
}());

//# sourceMappingURL=booking.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_services_api_service__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserService = /** @class */ (function () {
    //private _webinar_form_assessed: any;
    function UserService(apiService) {
        this.apiService = apiService;
        this._id = localStorage.getItem('userID') ? localStorage.getItem('userID') : null;
    }
    Object.defineProperty(UserService.prototype, "userId", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            localStorage.setItem('userID', id);
        },
        enumerable: true,
        configurable: true
    });
    UserService.prototype.userWebinarFormAssessed = function (status) {
        localStorage.setItem('user_webinar_form_assessed', status);
    };
    UserService.prototype.getUserWebinarFormAssessed = function () {
        return localStorage.getItem('user_webinar_form_assessed');
    };
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__app_services_api_service__["a" /* ApiService */]])
    ], UserService);
    return UserService;
}());

//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TermsConditionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_auth_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_api_service__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TermsConditionsPage = /** @class */ (function () {
    function TermsConditionsPage(navCtrl, navParams, apiService, authService, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.apiService = apiService;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        var loader = this.loadingCtrl.create({ duration: 10000 });
        loader.present().then(function () {
            _this.apiService.post(5956).subscribe(function (data) {
                console.log(data.data);
                _this.terms = data.data;
                loader.dismiss();
            }, function (error) {
                console.log(error);
                loader.dismiss();
            });
        });
    }
    TermsConditionsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TermsConditionsPage');
    };
    TermsConditionsPage.prototype.backToHome = function () {
        this.navCtrl.popToRoot();
    };
    TermsConditionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-terms-conditions',template:/*ion-inline-start:"D:\Ionic\lifestreet_mobile_app\src\pages\terms-conditions\terms-conditions.html"*/'<ion-header>\n\n  <ion-navbar color="navbar" hideBackButton>\n\n  <ion-buttons left>\n\n    <button ion-button clear (click)="backToHome()">\n\n      <ion-icon name="arrow-back" style="color: white;"> Back </ion-icon> \n\n    </button>\n\n  </ion-buttons> \n\n  <ion-title style="position: absolute; top: 0;left: 0;padding: 0 90px 1px;width: 100%;height: 100%;text-align: center;">\n\n    <img style="padding-top: 20px;" alt="logo" width="200px" height="70%" src="assets/images/lifestreet_home_logo.jpg">\n\n  </ion-title>\n\n</ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content class="terms-conditions-content">\n\n  <div class="terms-div">\n\n    <img width=100% src="assets/images/about_slice.png"/>\n\n  </div>\n\n    <div style="text-align: justify; font-size: 5vw; padding-left: 5%; padding-right: 5%">\n\n      <p>\n\n        Life Street supports the wellbeing of employees by providing wellbeing information, events and personal, confidential coaching. <br/><br/>\n\n\n\n        Your access to this App and connected services is enabled by your employer’s agreement with Life Street and your registration on the Life Street Wellbeing Website. <br/><br/>\n\n\n\n        This App is integrated with that Website and so the terms and conditions of use of this App are covered by those at <a style="text-decoration: none" target="_blank" href="https://wellbeing.lifestreet.com.au/terms-conditions/">https://wellbeing.lifestreet.com.au/terms-conditions/</a> <br/><br/>\n\n\n\n        If you have any queries, or if we can assist you with information or coaching, you can message Life Street via the Ask a Question function on this App or email <a href="mailto:hello@lifestreet.com.au">hello@lifestreet.com.au</a>. <br/><br/>\n\n      </p>\n\n      <!--<p class="terms-paragraph" [innerHTML]="terms?.post_content"></p>-->\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Ionic\lifestreet_mobile_app\src\pages\terms-conditions\terms-conditions.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__app_services_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_2__app_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], TermsConditionsPage);
    return TermsConditionsPage;
}());

//# sourceMappingURL=terms-conditions.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(373);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_services_auth_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_services_api_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_services_user_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_push__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__app_component__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_home_home__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_login_login__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_article_article__ = __webpack_require__(698);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_video_video__ = __webpack_require__(699);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_tool_tool__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_webinar_webinar__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_webinar_modal_webinar_modal__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_results_results__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_connect_connect__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_rate_rate__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_terms_conditions_terms_conditions__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_connect_presenter_connect_presenter__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_wellbeing_minute_wellbeing_minute__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_booking_booking__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_lite_home_lite_home__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_lite_eap_lite_eap__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_lite_about_lite_about__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_lite_book_lite_book__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_lite_contact_lite_contact__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_app_version__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_onesignal__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pipes_safe_html_safe_html__ = __webpack_require__(700);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__providers_push_notification_push_notification__ = __webpack_require__(136);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_7__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_16__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_article_article__["a" /* ArticlePage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_video_video__["a" /* VideoPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_tool_tool__["a" /* ToolPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_webinar_webinar__["a" /* WebinarPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_webinar_modal_webinar_modal__["a" /* WebinarModalPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_results_results__["a" /* ResultsPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_connect_connect__["a" /* ConnectPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_rate_rate__["a" /* RatePage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_terms_conditions_terms_conditions__["a" /* TermsConditionsPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_connect_presenter_connect_presenter__["a" /* ConnectPresenterPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_wellbeing_minute_wellbeing_minute__["a" /* WellbeingMinutePage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_booking_booking__["a" /* BookingPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_lite_home_lite_home__["a" /* LiteHomePage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_lite_eap_lite_eap__["a" /* LiteEapPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_lite_about_lite_about__["a" /* LiteAboutPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_lite_book_lite_book__["a" /* LiteBookPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_lite_contact_lite_contact__["a" /* LiteContactPage */],
                __WEBPACK_IMPORTED_MODULE_37__pipes_safe_html_safe_html__["a" /* SafeHtmlPipe */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/lite-book/lite-book.module#LiteBookPageModule', name: 'LiteBookPage', segment: 'lite-book', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/lite-contact/lite-contact.module#LiteContactPageModule', name: 'LiteContactPage', segment: 'lite-contact', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/lite-eap/lite-eap.module#LiteEapPageModule', name: 'LiteEapPage', segment: 'lite-eap', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/lite-home/lite-home.module#LiteHomePageModule', name: 'LiteHomePage', segment: 'lite-home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/wellbeing-minute/wellbeing-minute.module#WellbeingMinutePageModule', name: 'WellbeingMinutePage', segment: 'wellbeing-minute', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_8_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_16__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_article_article__["a" /* ArticlePage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_video_video__["a" /* VideoPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_tool_tool__["a" /* ToolPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_webinar_webinar__["a" /* WebinarPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_webinar_modal_webinar_modal__["a" /* WebinarModalPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_results_results__["a" /* ResultsPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_connect_connect__["a" /* ConnectPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_rate_rate__["a" /* RatePage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_terms_conditions_terms_conditions__["a" /* TermsConditionsPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_connect_presenter_connect_presenter__["a" /* ConnectPresenterPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_wellbeing_minute_wellbeing_minute__["a" /* WellbeingMinutePage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_booking_booking__["a" /* BookingPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_lite_home_lite_home__["a" /* LiteHomePage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_lite_eap_lite_eap__["a" /* LiteEapPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_lite_about_lite_about__["a" /* LiteAboutPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_lite_book_lite_book__["a" /* LiteBookPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_lite_contact_lite_contact__["a" /* LiteContactPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_push__["a" /* Push */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_11__app_services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_12__app_services_api_service__["a" /* ApiService */],
                __WEBPACK_IMPORTED_MODULE_13__app_services_user_service__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_35__ionic_native_app_version__["a" /* AppVersion */],
                { provide: __WEBPACK_IMPORTED_MODULE_7__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_36__ionic_native_onesignal__["a" /* OneSignal */],
                __WEBPACK_IMPORTED_MODULE_38__providers_push_notification_push_notification__["a" /* PushNotificationProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_auth_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_api_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lite_home_lite_home__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(events, alertCtrl, authService, loadingCtrl, apiService) {
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.apiService = apiService;
        this.username = '';
        this.password = '';
        this.user_id = '';
        this.date = new Date();
        // this.apiService.load();
        this.apiService.trendingUpdated().subscribe(function (data) {
            localStorage.setItem('trending_last_update', JSON.stringify(data.data.trending_updated_date));
        }, function (error) { return console.log(error); });
    }
    LoginPage.prototype.showAlert = function (username, password) {
        var message = null;
        if (username === '' && password) {
            message = 'Username is required';
        }
        else if (username && password === '') {
            message = 'Password is required';
        }
        else {
            message = 'Username/Password is required';
        }
        var alert = this.alertCtrl.create({
            title: 'Login Error',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    LoginPage.prototype.showloginError = function (error) {
        var alert = this.alertCtrl.create({
            title: 'Login Error',
            subTitle: "<br><small>[ERROR][APP] A000</small><br>" + error + "<br><br> <b>Please try again later.</b>",
            buttons: ['OK']
        });
        alert.present();
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        if (this.username == '' || this.password == '') {
            this.showAlert(this.username, this.password);
            return;
        }
        var loader = this.loadingCtrl.create({
            content: "Logging in...",
            duration: 10000
        });
        loader.present().then(function () {
            console.log('loader');
            _this.authService.authenticate(_this.username, _this.password)
                .subscribe(function (data) {
                // side page username data               
                localStorage.setItem('username', _this.username);
                //push notification user id
                _this.user_id = data.data.ID;
                // check for service
                _this.apiService
                    .loadPost()
                    .info(data.data.company_id)
                    .then(function () {
                    // publish an event for the side name
                    _this.events.publish('user:login', _this.username, Date.now());
                    //publish an event for push notification
                    _this.events.publish('user:ID', _this.user_id);
                    var isLite = localStorage.getItem('company_service') && localStorage.getItem('company_service') === 'lite';
                    // move to the home page
                    var root = (isLite ? __WEBPACK_IMPORTED_MODULE_5__lite_home_lite_home__["a" /* LiteHomePage */] : __WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
                    _this.events.publish('app:changeroot', root);
                    // dismiss the loader
                    loader.dismiss();
                })
                    .catch(function (err) {
                    // this may happen in old version
                    _this.events.publish('app:changeroot', __WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
                    // dismiss the loader
                    loader.dismiss();
                });
            }, function (error) {
                console.log('login error', error);
                if (error.status == 0) {
                    _this.showloginError("It looks like you don't have an internet connection.");
                }
                else if (error.data) {
                    console.log(error.data.message);
                    _this.showloginError(error.data.message);
                }
                else {
                    _this.showloginError("Internal Server Error");
                }
                loader.dismiss();
            });
        });
    };
    LoginPage.prototype.launchSite = function () {
        var url = "https://www.lifestreet.com.au/privacy-policy";
        window.open(url, '_system', 'location=yes');
    };
    LoginPage.prototype.forgotPassword = function () {
        var url = 'https://wellbeing.lifestreet.com.au/forgot-password/';
        window.open(url, '_system', 'location=yes');
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"D:\Ionic\lifestreet_mobile_app\src\pages\login\login.html"*/'<ion-header>\n\n</ion-header>\n\n\n\n<ion-content class="masters">\n\n\n\n  <div class="logo">\n\n      <img alt="logo" width="70%" height="auto" src="assets/images/lifestreet_logo.jpg" >\n\n  </div> <!-- logo -->\n\n\n\n  <div class="flex">\n\n        <div class="username-input">\n\n          <div style="width: 100%; vertical-align: middle; text-align: center; padding-top: 3%; padding-left:5%; height: auto">\n\n              <ion-input class="textinput" center type="text" placeholder="Username" [(ngModel)]="username"></ion-input>\n\n          </div>\n\n        </div> <!-- username input -->\n\n\n\n        <br >\n\n        <div class="input1">\n\n          <div style="width: 100%; vertical-align: middle; text-align: center; padding-top: 3%; padding-left:5%; height: auto">\n\n              <ion-input class="textinput" type="password" placeholder="Password" [(ngModel)]="password"></ion-input>\n\n          </div>\n\n        </div> <!-- password input -->\n\n\n\n        <div class="forgot-password">\n\n          <button style="height: 10vw; width: 85%; margin-left: auto; margin-right: auto;" clear block ion-button (click)="forgotPassword()"><p style="font-size: 3.5vw; color: black" >Forgotten username or password?<br /><span><u>CONTACT US</u></span></p></button>\n\n        </div> <!-- forgot password -->\n\n\n\n        <div class="div-btn" text-center>\n\n          <button class="login-btn-btn" clear block ion-button (click)="login()">\n\n            <!--<img class="login-btn-img" alt="logo" src="assets/images/btn_login.jpg" >-->\n\n          </button>\n\n        </div> <!-- button -->\n\n\n\n  </div> <!-- flex div -->\n\n\n\n  <div class="footer-containter">\n\n      <img class="footer-img" alt="logo" src="assets/images/footer_logo.png">\n\n      <p style="padding-bottom: 2%; margin: 0; font-size: 2.7vw; "><span (tap)="launchSite()" style="float: left; color: white; padding-left: 5%">Privacy Policy</span><span style="float: right; padding-right: 5%; color:white">© Life Street (Australia) Pty Ltd {{ date | date:\'yyyy\' }}</span></p>\n\n  </div> <!-- footer image -->\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Ionic\lifestreet_mobile_app\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__app_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__app_services_api_service__["a" /* ApiService */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WellbeingMinutePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_services_api_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helpers__ = __webpack_require__(678);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var WellbeingMinutePage = /** @class */ (function () {
    function WellbeingMinutePage(navCtrl, loadingCtrl, navParams, apiService, sanitizer, viewCtrl, alertCtrl, events, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.apiService = apiService;
        this.sanitizer = sanitizer;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.platform = platform;
        this.logo = null;
        this.wb_id = 0;
        this.wb_minute = null;
        this.wb_minute_title = null;
        this.wb_minute_content = null;
        this.wb_minute_quiz = null;
        this.wb_base_url = null;
        this.wb_style = {
            header: '#58595B',
            background: '#FCB036',
            text: '#FFFFFF',
        };
        this.wb_status = null;
        this.input = [];
        this.inputIndex = [];
        this.is_loading = true;
        this.is_taking_quiz = null;
        this.loader = null;
        this.user_id = null;
        this.results = null;
        this.results_description = null;
        this.user_wb_minute = false;
        this.id = 0;
        this.link = null;
        this.push_user_id = null;
        // only allow standard service for this
        if (localStorage.getItem('company_service') === 'lite') {
            this.navCtrl.popToRoot();
            return;
        }
        this.user_id = localStorage.getItem('userID');
        if (!this.user_id) {
            this.events.publish('app:changeroot', __WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
            return;
        }
        this.wb_minute = this.navParams.get('wb_minute');
        this.wb_id = this.navParams.get('id');
        this.logo = "assets/images/lifestreet_wb_logo.png";
        // create loader
        this.loader = this.loadingCtrl.create({ duration: 10000 });
        this.loader.present().then(function () {
            if (_this.wb_minute == undefined && _this.wb_id == undefined) {
                _this.checkMinute(_this.user_id);
            }
            else {
                // TODO determine id first
                var id = _this.wb_minute ? _this.wb_minute.id : _this.wb_id;
                _this.getWbMinute(id);
            }
        });
    }
    WellbeingMinutePage.prototype.ionViewWillEnter = function () {
        this.viewCtrl.showBackButton(false);
    };
    WellbeingMinutePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WellbeingMinutePage');
    };
    WellbeingMinutePage.prototype.processPostMeta = function (metas) {
        var _this = this;
        // validate post meta
        if (metas) {
            // iterate minute post metas
            metas.forEach(function (meta) {
                _this.getQuiz(meta);
                _this.getStyles(meta);
            });
        }
        // sets toolbar style
        var toolbar = document.getElementsByTagName('page-wellbeing-minute')[0].getElementsByClassName("toolbar-background")[0];
        if (toolbar instanceof HTMLElement) {
            toolbar.style.backgroundColor = this.wb_style.header;
        }
    };
    WellbeingMinutePage.prototype.processPostStatus = function (status) {
        var _this = this;
        this.wb_status = status;
        // when status is still null, then it should be started
        console.log('wb_status', this.wb_status);
        if (this.wb_status == __WEBPACK_IMPORTED_MODULE_4__constants__["c" /* STATUS_NOT_STARTED */] || this.wb_status == null) {
            this.wb_status = __WEBPACK_IMPORTED_MODULE_4__constants__["c" /* STATUS_NOT_STARTED */];
            // update to start / not completed
            this.apiService.updateWellbeingMinute(this.user_id, {
                wb_id: this.wb_minute.ID,
                status: __WEBPACK_IMPORTED_MODULE_4__constants__["b" /* STATUS_NOT_COMPLETED */],
                action: 'change_status'
            }).subscribe();
        }
        else if (this.wb_status == __WEBPACK_IMPORTED_MODULE_4__constants__["a" /* STATUS_COMPLETED */]) {
            this.showAlert('Info', 'Wellbeing Minute has been completed, you will be redirect back to home page', function () { return _this.goback(); });
            return;
        }
    };
    // get styles from meta
    WellbeingMinutePage.prototype.getStyles = function (meta) {
        // header
        if (meta.meta_key === 'header_color_style' &&
            meta.meta_value !== '') {
            this.wb_style.header = meta.meta_value;
            console.log('new header: ', this.wb_style.header);
            // background
        }
        else if (meta.meta_key === 'background_color_style' &&
            meta.meta_value !== '') {
            this.wb_style.background = meta.meta_value;
            console.log('new background: ', this.wb_style.background);
            // text
        }
        else if (meta.meta_key === 'text_color_style' &&
            meta.meta_value !== '') {
            this.wb_style.text = meta.meta_value;
            console.log('new text: ', this.wb_style.text);
        }
    };
    // get minute quiz
    WellbeingMinutePage.prototype.getQuiz = function (meta) {
        var _this = this;
        // look for the quiz
        if (meta.meta_key === 'wellbeing_minutes_select_quiz' &&
            meta.meta_value !== '') {
            // check if base url is available
            if (this.wb_base_url == null) {
                console.error('No base url for wellbeing minute quiz fetched', this.wb_base_url);
                return;
            }
            console.log('quiz url: ', meta.meta_value);
            // initialize quiz
            this.wb_minute_quiz = {};
            this.apiService
                .postByUrl(meta.meta_value)
                .subscribe(
            // success
            function (data) {
                console.log('post id by url: ', data);
                if (data.post_id > 0) {
                    _this.getQuizGF(data.post_id);
                }
                else {
                    // to indicate no quiz
                    _this.wb_minute_quiz = null;
                }
            }, function (error) { return console.log('quiz fetch post id by url', error); });
        }
    };
    // [Gravity Form] get minute quiz
    WellbeingMinutePage.prototype.getQuizGF = function (id) {
        var _this = this;
        // first fetch for the post and its meta
        this.apiService.post(id).subscribe(function (data) {
            var tool_meta = data.data.meta;
            var check_quiz = false;
            console.log('test quiz gf', data);
            // iterate meta
            tool_meta.forEach(function (meta) {
                // get quiz id
                if (meta.meta_key == '_assessment_quiz_id') {
                    // get dynamic quiz form id
                    _this.apiService.postForm(meta.meta_value).subscribe(function (data) {
                        if (data.data && data.code != 'form_not_found') {
                            _this.is_taking_quiz = false;
                            _this.wb_minute_quiz = data.data.structure;
                        }
                        else {
                            // to indicate no quiz
                            _this.wb_minute_quiz = null;
                            console.log('Fail to get quiz : ', data);
                        }
                    }, function (error) {
                        // to indicate no quiz
                        _this.wb_minute_quiz = null;
                        console.log('Error on getting quiz form', error);
                    });
                    check_quiz = true;
                }
                // get quiz results descriptions
                if (meta.meta_key == 'tool_results_description') {
                    _this.results_description = meta.meta_value;
                }
            });
            // when no checking of quiz
            if (!check_quiz) {
                // indicate no quiz
                _this.wb_minute_quiz = null;
            }
        }, function (error) {
            // to indicate no quiz
            _this.wb_minute_quiz = null;
            console.log('Error on getting quiz post', error);
        });
    };
    WellbeingMinutePage.prototype.getItemBG = function (i) {
        i = i + 1;
        if (i % 2 == 1) {
            return 'white';
        }
        else {
            return '#DCDDDE';
        }
    };
    WellbeingMinutePage.prototype.onChange = function (choice, id, index) {
        console.log('index_' + id + ' ' + choice);
        var idx = 'index_' + id;
        var obj = [];
        obj.push(idx);
        obj.push(choice);
        var objidx = null;
        this.input.forEach(function (arr, i) {
            if (arr[0] == idx) {
                objidx = i;
            }
        });
        if (objidx !== null && this.input.length > 0) {
            this.input.splice(objidx, 1);
        }
        else {
            this.inputIndex.push(index + 1);
        }
        this.input.push(obj);
    };
    WellbeingMinutePage.prototype.onTakeQuiz = function () {
        this.is_taking_quiz = true;
    };
    WellbeingMinutePage.prototype.onSubmitQuiz = function () {
        var _this = this;
        // prevent form from submitting when there is no form id provided
        if (!this.wb_minute_quiz) {
            this.showAlert('Form Error', '<br><small>[ERROR][APP] A100</small><br> Cannot submit now <br><br> <b>Please try to refresh the page.</b>');
            return;
        }
        /**
         * DECLARE VARIABLES
         */
        var field_counter = 0;
        var tool_fields = this.wb_minute_quiz.fields;
        var question_num = [];
        var input_num = this.inputIndex;
        var missing_input = '';
        /**
         * Loop through the form fields that is required
         */
        tool_fields.forEach(function (field, index) {
            if (field.isRequired == true) {
                field_counter = field_counter + 1;
                question_num.push(index + 1);
            }
        });
        /**
         * Run the checker to see which fields are missing
         */
        console.log('question number: ', question_num);
        console.log('input_numbeer: ', input_num);
        var missing_num = Object(__WEBPACK_IMPORTED_MODULE_5__helpers__["a" /* CheckDiff */])(question_num, input_num);
        console.log(missing_num);
        /**
         * Create the missing input message
         */
        missing_num.forEach(function (item) {
            var n_item = item + ',';
            missing_input = missing_input + ' ' + n_item;
        });
        missing_input = missing_input.replace(/,\s*$/, "");
        /**
         * Determine if the input number is the same, if not
         * then show error, if the same submit to the api.
         */
        if (this.input.length < field_counter) {
            this.showAlert('Quiz Form Error', 'Please complete quiz form on number ' + missing_input + '.');
        }
        else {
            var loader_1 = this.loadingCtrl.create({ content: 'Please wait...' });
            var apiData_1 = {
                'user': this.user_id,
                'data': this.input
            };
            loader_1.present().then(function () {
                var self = _this;
                var id = _this.wb_minute_quiz.id;
                var title = _this.wb_minute_quiz.title;
                self.is_taking_quiz = null;
                _this.apiService.postQuizResponse(id, apiData_1).subscribe(function (data) {
                    console.log(data);
                    // fetch results
                    self.apiService.userFormResults(self.user_id, id).subscribe(function (data) {
                        loader_1.dismiss();
                        // add delay here
                        setTimeout(function () {
                            // to hide spinner
                            self.wb_minute_quiz = null;
                            self.results = data.data;
                            self.results.title = title;
                        }, 500);
                    }, function (error) {
                        loader_1.dismiss();
                        console.log(error);
                    });
                }, function (error) {
                    console.log(error);
                    loader_1.dismiss();
                    // show quiz again
                    self.is_taking_quiz = true;
                });
            });
        }
    };
    WellbeingMinutePage.prototype.onCompleted = function () {
        var _this = this;
        // update to start / not completed
        this.loader = this.loadingCtrl.create({ duration: 10000 });
        this.loader.present().then(function () {
            _this
                .apiService
                .updateWellbeingMinute(_this.user_id, {
                wb_id: _this.wb_minute.ID,
                status: __WEBPACK_IMPORTED_MODULE_4__constants__["a" /* STATUS_COMPLETED */],
                action: 'change_status'
            })
                .subscribe(function (data) {
                // dismiss loader
                _this.loader.dismiss();
                // notify home to check wellbeing minute
                _this.events.publish('app:checkminute');
                _this.navCtrl.popToRoot();
                // with error
            }, function (error) {
                _this.loader.dismiss();
            });
        });
    };
    WellbeingMinutePage.prototype.checkMinute = function (userID) {
        var _this = this;
        this.user_wb_minute = false;
        //wb_minute_check current user and expiry
        this.apiService.getUserWbMinute(userID).subscribe(function (data) {
            // validate data to avoid errors when wellbeing minute is not available
            if (!data.data || !data.data.ID) {
                _this.showAlert('Error', 'User does not belong to this wellbeing minute', function () { return _this.goback(); });
                return;
            }
            _this.link = data.data.ID;
            _this.getWbMinute(_this.link);
        });
    };
    WellbeingMinutePage.prototype.getWbMinute = function (id) {
        var _this = this;
        this.apiService.getWellbeingMinute(id, this.user_id).subscribe(function (_a) {
            var data = _a.data;
            // dismiss loader
            _this.loader.dismiss();
            // if post not found
            if (data.post === null) {
                // with post meta found, only user is not found otherwise this post not found
                var mess = data.post_meta.length > 0 ? 'User does not belong to this wellbeing minute' : 'Wellbeing Minute not found.';
                // show error message
                _this.showAlert('Error', mess, function () { return _this.goback(); });
                return;
                // if theres an error
            }
            else if (data.status === false) {
                // show error message
                _this.showAlert('Error', data.message);
                return;
            }
            else if (data.post_expired) {
                // show expire notification
                _this.showAlert('Sorry', 'Wellbeing Minute has just expired.', function () { return _this.goback(); });
                return;
            }
            _this.wb_base_url = data.url;
            _this.wb_minute = data.post;
            _this.wb_minute_title = _this.wb_minute.post_title;
            console.log('content: ', _this.wb_minute.post_content.split("\n\n"));
            _this.wb_minute_content = _this.wb_minute.post_content;
            _this.is_loading = false;
            // process post meta data
            _this.processPostMeta(data.post_meta);
            // check status update
            _this.processPostStatus(data.post.status);
            // process content embedded section
            // process links
            setTimeout(function () {
                Object(__WEBPACK_IMPORTED_MODULE_5__helpers__["b" /* ProcessEmbed */])(document);
                Object(__WEBPACK_IMPORTED_MODULE_5__helpers__["c" /* ProcessLinks */])(document);
            }, 500);
            // process content 
        }, 
        // fail to get wellbeing minute details
        function (error) {
            _this.loader.dismiss();
            _this.showAlert('Error', 'Cant find details for the wellbeing minute', function () { return _this.goback(); });
        });
    };
    WellbeingMinutePage.prototype.goback = function () {
        // notify home to check wellbeing minute
        this.events.publish('app:checkminute');
        this.navCtrl.popToRoot();
    };
    WellbeingMinutePage.prototype.showAlert = function (title, message, ok) {
        if (ok === void 0) { ok = null; }
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: [{ text: 'OK', handler: ok }]
        });
        alert.present();
    };
    WellbeingMinutePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-wellbeing-minute',template:/*ion-inline-start:"D:\Ionic\lifestreet_mobile_app\src\pages\wellbeing-minute\wellbeing-minute.html"*/'<ion-header color="navbar">\n\n  <ion-navbar color="navbar" align-title="center">\n\n    <ion-buttons end>\n\n        <button menuToggle ion-button icon-only>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n    <ion-title style="position: absolute; top: 0;left: -10px; padding: 0 50px 1px; width: 105%; height: 110%;">\n\n      <img alt="logo" width="120px" height="100%" src="{{logo}}">      \n\n    </ion-title> \n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content no-padding fullscreen [style.background-color]="wb_style.background" [style.color]="wb_style.text">\n\n  <div *ngIf="!is_loading">\n\n    <ion-row>\n\n      <ion-col id="wb_minute_title" text-wrap [style.background-color]="wb_style.header">\n\n           <h3>{{wb_minute_title}}</h3>\n\n      </ion-col>    \n\n    </ion-row> \n\n\n\n    <ion-row id="wb_minute_content">\n\n      <ion-col no-padding> \n\n        <div  [innerHTML]="wb_minute_content | safeHtmlPipe" id="wb_inner_content"></div>\n\n      </ion-col>    \n\n    </ion-row> \n\n\n\n    <ion-row>\n\n      <ion-col no-padding>\n\n        <!-- Minute Quiz Section -->\n\n        <!-- <div *ngIf="wb_minute_quiz && wb_base_url">\n\n          <iframe id="wb_minute_quiz_frame" [src]="wb_minute_quiz" frameborder="0" width="100%" height="100%"></iframe>\n\n        </div> -->\n\n        \n\n        <!-- Minute Quiz Section GF -->\n\n        <form #f="ngForm" *ngIf="results == null && is_taking_quiz && wb_minute_quiz">\n\n            <h4 text-center style="margin-bottom: 2rem">{{ wb_minute_quiz.title }}</h4>\n\n\n\n            <ion-list *ngFor="let field of wb_minute_quiz.fields; let i = index" style="margin-bottom: 0px;">\n\n                <!-- TYPE == SECTION -->\n\n                <ion-item *ngIf="field.type == \'section\'">\n\n                    <ion-label style="font-size: 3vw">{{ field.label }}</ion-label>\n\n                </ion-item>\n\n                <!-- TYPE == TEXT -->\n\n                <ion-item *ngIf="field.type == \'text\'">\n\n                    <ion-label style="font-size:3vw">{{ field.label }}</ion-label>\n\n                    <ion-input type="text"></ion-input><br />\n\n                </ion-item>\n\n                <!-- TYPE == TEXT-AREA -->\n\n                <ion-item *ngIf="field.type == \'textarea\'">\n\n                    <ion-label style="font-size: 3vw">{{ field.label }}</ion-label>\n\n                    <ion-textarea></ion-textarea><br />\n\n                </ion-item>\n\n                <!-- TYPE == LIST -->\n\n                <ion-list *ngIf="field.type == \'list\'" radio-group>\n\n                    <ion-list-header style="background-color: #DCDDDE">\n\n                        <p style="white-space: normal; font-size: 4vw">{{ field.label }}</p>\n\n                    </ion-list-header>\n\n                    <ion-item *ngFor="let choice of field.choices">\n\n                        <ion-label style="font-size: 3vw">{{ choice.text }}</ion-label>\n\n                        <ion-radio [value]="choice.value" (ionSelect)="onChange(choice.value,field.id, i)"></ion-radio>\n\n                    </ion-item>\n\n                </ion-list>\n\n                <!-- TYPE == SELECT -->\n\n                <ion-list *ngIf="field.type == \'select\'" radio-group>\n\n                    <ion-list-header style="background-color: #DCDDDE">\n\n                        <p style="white-space: normal; font-size: 4vw">{{ field.label }}</p>\n\n                    </ion-list-header>\n\n                    <ion-item *ngFor="let choice of field.choices">\n\n                        <ion-label style="font-size: 3vw">{{ choice.text }}</ion-label>\n\n                        <ion-radio value="{{ choice.value }}"></ion-radio>\n\n                    </ion-item>\n\n                </ion-list>\n\n                <!-- TYPE == RADIO -->\n\n                <ion-list *ngIf="field.type == \'radio\'" \n\n                  radio-group\n\n                  style="margin-bottom: 0px; color: #222; padding-top: 1.75%;"\n\n                  [style.background-color]="getItemBG(i)">\n\n                    <h6 style="white-space: normal; font-size: 4vw; padding-left: 2.5%; padding-right: 2.5%;">{{ field.label }}</h6>\n\n                    <ion-item \n\n                      [style.background-color]="getItemBG(i)"\n\n                      *ngFor="let choice of field.choices">\n\n                        <ion-label style="font-size: 3vw">{{ choice.text }}</ion-label>\n\n                        <ion-radio [value]="choice.value" (ionSelect)="onChange(choice.value,field.id, i)"></ion-radio>\n\n                    </ion-item>\n\n                </ion-list>\n\n                <!-- TYPE == QUIZ -->\n\n                <ion-list \n\n                  *ngIf="field.type == \'quiz\' && field.inputType == \'radio\'" radio-group\n\n                  style="margin-bottom: 0px; color: #222; padding-top: 1.75%;"\n\n                  [style.background-color]="getItemBG(i)">\n\n                        <h6 style="white-space: normal; font-size: 4vw; padding-left: 2.5%; padding-right: 2.5%;">{{ field.label }}</h6>\n\n                        <ion-item \n\n                          [style.background-color]="getItemBG(i)"\n\n                          *ngFor="let choice of field.choices">\n\n                            <ion-label style="font-size: 3vw">{{ choice.text }}</ion-label>\n\n                            <ion-radio [value]="choice.value" (ionSelect)="onChange(choice.value,field.id, i)"></ion-radio>\n\n                        </ion-item>\n\n                </ion-list>\n\n            </ion-list>\n\n        </form>\n\n\n\n        <div *ngIf="results" padding id="quiz_results">\n\n          <h4 text-center style="margin-bottom: 2rem">{{ results.title }}</h4>\n\n\n\n          <p *ngIf="results_description" [innerHTML]="results_description" text-center id="quiz_description"></p>\n\n          <div [innerHTML]="results?.assessment_group_results"></div>\n\n          <div [innerHTML]="results?.individual_results"></div>\n\n        </div>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n    <ion-row>\n\n      <ion-col padding text-center>\n\n\n\n        <ion-spinner *ngIf="wb_minute_quiz && is_taking_quiz === null" color="light"></ion-spinner>\n\n\n\n        <!-- Not Taken The Quiz Yet Button -->\n\n        <button *ngIf="is_taking_quiz === false" ion-button full [style.background-color]="wb_style.header" (click)="onTakeQuiz()" margin-bottom>Take A Quiz</button>\n\n\n\n        <!-- While Taking the Quiz -->\n\n        <button *ngIf="is_taking_quiz === true" ion-button full (click)="onSubmitQuiz()" [style.background-color]="wb_style.header">Submit</button>\n\n\n\n        <!-- When Completed Quiz or w/o Quiz -->\n\n        <button *ngIf="is_taking_quiz !== true" ion-button full [style.background-color]="wb_style.header" (click)="onCompleted()">Close</button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Ionic\lifestreet_mobile_app\src\pages\wellbeing-minute\wellbeing-minute.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__app_services_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */]])
    ], WellbeingMinutePage);
    return WellbeingMinutePage;
}());

//# sourceMappingURL=wellbeing-minute.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LiteHomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lite_eap_lite_eap__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lite_about_lite_about__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lite_book_lite_book__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lite_contact_lite_contact__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_services_api_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_services_auth_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_home__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__login_login__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__wellbeing_minute_wellbeing_minute__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 * Generated class for the LiteHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LiteHomePage = /** @class */ (function () {
    // constructor settings
    function LiteHomePage(navCtrl, loadingCtrl, navParams, apiService, authService, alertCtrl, platform, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.apiService = apiService;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.events = events;
        // list home page properties
        this.isLoading = true;
        this.user_wb_minute = false;
        this.wb_minute = null;
        this.loaderTimeout = null;
        console.log('litehome constructor');
        // listen to on resume
        this.onResumeSubscription = this.platform.resume.subscribe(function () {
            // do something meaningful when the app is put in the foreground
            _this.initApi();
        });
        // listen to event from other pages
        this.events.subscribe('lite:checkservice', function (cb) {
            // checks service and update other info
            _this
                .checkService()
                .then(function () {
                if (typeof cb !== 'undefined') {
                    cb();
                }
            })
                .catch(function () {
                if (typeof cb !== 'undefined') {
                    cb();
                }
            });
        });
        this.events.subscribe('lite:homesettings', function (cb) {
            // checks home settings info
            _this.getHomeSettings(cb);
        });
    }
    LiteHomePage.prototype.ngOnInit = function () {
        this.initApi();
    };
    LiteHomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LiteHomePage');
    };
    // refreshing page
    LiteHomePage.prototype.doRefresh = function (refresher) {
        this.initApi();
        refresher.complete();
    };
    // called when destroy view
    LiteHomePage.prototype.ngOnDestroy = function () {
        console.log('litehome onDestroy');
        this.hideLoader();
        // always unsubscribe your subscriptions to prevent leaks
        this.onResumeSubscription.unsubscribe();
        this.events.unsubscribe('lite:checkservice');
        this.events.unsubscribe('lite:homesettings');
    };
    // --------------- COMMON FUNCTIONS ---------------------
    // go to a specific page
    LiteHomePage.prototype.goto = function (page) {
        switch (page) {
            case 'eap':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__lite_eap_lite_eap__["a" /* LiteEapPage */]);
                break;
            case 'about':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__lite_about_lite_about__["a" /* LiteAboutPage */]);
                break;
            case 'book':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__lite_book_lite_book__["a" /* LiteBookPage */]);
                break;
            case 'contact':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__lite_contact_lite_contact__["a" /* LiteContactPage */]);
                break;
            case 'minute':
                if (!this.user_wb_minute) {
                    var alert_1 = this.alertCtrl.create({
                        title: 'Error',
                        subTitle: "<br><small>[ERROR][APP] A500</small><br> Invalid Wellbeing Data</b>",
                        buttons: ['OK']
                    });
                    alert_1.present();
                    return;
                }
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__wellbeing_minute_wellbeing_minute__["a" /* WellbeingMinutePage */], {
                    wb_minute: this.wb_minute
                });
        }
    };
    // initializing api
    LiteHomePage.prototype.initApi = function () {
        // check for minute
        var _this = this;
        this.loader = this.loadingCtrl.create();
        // show loader
        this.loader.present().then(function () {
            // now check company info if service still lite
            _this.checkService()
                .then(function () {
                _this.getHomeSettings();
            })
                .catch(function () {
                _this.settings = JSON.parse(localStorage.getItem('lite_home_settings'));
                _this.hideLoader();
            });
        });
        // add expiration for loader | note : do not use 'duration' may cause error
        this.loaderTimeout = setTimeout(function () {
            _this.hideLoader();
        }, 10000);
    };
    LiteHomePage.prototype.getHomeSettings = function (cb) {
        var _this = this;
        // fetch api data for lite home setting
        this
            .apiService
            .liteHomeSettings()
            .subscribe(function (_a) {
            var data = _a.data;
            _this.hideLoader();
            _this.settings = data;
            console.log('fetched litehome setting');
            localStorage.setItem('lite_home_settings', JSON.stringify(data));
            if (typeof cb !== 'undefined') {
                cb();
            }
        }, function (error) {
            console.error('[ERROR][HOME] 2 : ', error);
            _this.hideLoader();
            // let alert = this.alertCtrl.create({
            //     title: 'Internal Server Error',
            //     subTitle: '[ERROR][HOME] 2 : Please try again.',
            //     buttons: ['OK']
            // });
            // alert.present()
        });
    };
    // this function serve as check the company service type
    // this will also update booking settings
    LiteHomePage.prototype.checkService = function () {
        var _this = this;
        return new Promise(function (res, err) {
            var compid = localStorage.getItem('compId');
            if (!compid) {
                _this.apiService
                    .getCompanyId().then(function () {
                    // check the lite version again
                    err();
                    // redirect back to standard page
                    _this.events.publish('app:changeroot', __WEBPACK_IMPORTED_MODULE_8__home_home__["a" /* HomePage */]);
                })
                    .catch(function (error) {
                    var alert = _this.alertCtrl.create({
                        title: 'Internal Server Error',
                        subTitle: "<br><small>[ERROR][LITE] L002</small><br>There's a problem fetching the service type. <br><br> <b>Please try again later.</b>",
                        buttons: ['OK']
                    });
                    alert.present();
                    // dismiss loader
                    _this.hideLoader();
                });
                return;
            }
            // if company id == null
            if (compid == 'null') {
                var alert_2 = _this.alertCtrl.create({
                    title: 'Error',
                    subTitle: "<br><small>[ERROR][LITE] L003</small><br>Invalid company ID. <br><br> <b>You must need to re-login.</b>",
                    buttons: [{
                            text: 'OK',
                            handler: function () {
                                err();
                                _this.authService.logOut().subscribe(function (data) {
                                    _this.events.publish('app:changeroot', __WEBPACK_IMPORTED_MODULE_9__login_login__["a" /* LoginPage */]);
                                    _this.hideLoader();
                                }, function (error) {
                                    console.log(error);
                                    _this.events.publish('app:changeroot', __WEBPACK_IMPORTED_MODULE_9__login_login__["a" /* LoginPage */]);
                                    _this.hideLoader();
                                });
                            }
                        }]
                });
                alert_2.present();
                return;
            }
            // check for any updates in the server
            _this
                .apiService
                .loadPost()
                .info(compid)
                .then(function (data) {
                // validate company service type
                if (!localStorage.getItem('company_service') || localStorage.getItem('company_service') !== 'lite') {
                    // hides loader
                    _this.hideLoader();
                    // publish an event for service changed
                    _this.events.publish('service:changed');
                    // redirect back to standard page
                    // this.events.publish('app:changeroot', HomePage)
                    _this.events.publish('app:changeroot', __WEBPACK_IMPORTED_MODULE_8__home_home__["a" /* HomePage */]);
                    // stops from initializing api again
                    return err();
                }
                res(data);
            })
                .catch(function (error) {
                _this.settings = JSON.parse(localStorage.getItem('lite_home_settings'));
                _this.hideLoader();
                var eTitle = "";
                var eMessage = "";
                var buttons = [];
                if (error.status == 500) {
                    eTitle = "Error";
                    eMessage = "<br><small>[ERROR][LITE] L004</small><br> The company ID does not exist. <br><br><b>You must need to re-login.</b>";
                    buttons.push({
                        text: 'OK',
                        handler: function () {
                            _this.authService.logOut().subscribe(function (data) {
                                _this.events.publish('app:changeroot', __WEBPACK_IMPORTED_MODULE_9__login_login__["a" /* LoginPage */]);
                            }, function (error) {
                                console.log(error);
                                _this.events.publish('app:changeroot', __WEBPACK_IMPORTED_MODULE_9__login_login__["a" /* LoginPage */]);
                            });
                        }
                    });
                }
                else if (error.status == 0) {
                    eTitle = 'Connection Error';
                    eMessage = "<br><small>[ERROR][LITE] L001</small><br> It looks like you don't have an internet connection.<br><br> <b>Please try again later.</b>";
                    buttons.push("OK");
                }
                else {
                    eTitle = 'Error';
                    eMessage = "<br><small>[ERROR][LITE] L000</small><br> " + error._body;
                    buttons.push("OK");
                }
                var alert = _this.alertCtrl.create({
                    title: eTitle,
                    subTitle: eMessage,
                    buttons: buttons
                });
                alert.present();
                err(error);
            });
        });
    };
    // hides loading
    LiteHomePage.prototype.hideLoader = function () {
        this.isLoading = false;
        if (this.loader != null) {
            this.loader.dismiss();
            this.loader = null;
        }
        if (this.loaderTimeout) {
            clearTimeout(this.loaderTimeout);
            this.loaderTimeout = null;
        }
    };
    LiteHomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-lite-home',template:/*ion-inline-start:"D:\Ionic\lifestreet_mobile_app\src\pages\lite-home\lite-home.html"*/'<ion-header>\n\n  <ion-toolbar color="navbar" align-title="center" padding>\n\n    <ion-buttons left>\n\n        <button menuToggle ion-button icon-only>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n    <ion-buttons end>\n\n        <button menuToggle ion-button icon-only>\n\n            <ion-icon></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n    <ion-title class="ion-text-start">\n\n        <img alt="logo" src="assets/images/lifestreet_home_logo.jpg">\n\n    </ion-title>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content pullingText="Pull to refresh..." refreshingText="Refreshing...">\n\n        </ion-refresher-content>\n\n    </ion-refresher>\n\n\n\n\n\n    <div *ngIf="!isLoading && settings">\n\n        <ion-grid style="padding: 0; margin: 0; margin-bottom: 0">\n\n            <ion-row>\n\n                <ion-col id="wb_minute_notif_bar" *ngIf="user_wb_minute">\n\n                    <img src="assets/images/lifestreet_wb_logo.png" alt="" style="width: 40vw; max-width: 220px;">\n\n                    <h3>{{ wb_minute.post_title }}</h3>\n\n                    <button ion-button full (click)="goto(\'minute\')" style="background-color: #FCB036; letter-spacing: 1.2px;">View Now</button>\n\n                </ion-col>    \n\n            </ion-row>\n\n        </ion-grid>\n\n        <div id="home-banner">\n\n            <img src="{{ settings.featured_image || \'https://placehold.it/300x150\' }}" />\n\n        </div>\n\n\n\n        <div padding>\n\n            <ion-list id="home-menu">\n\n                <ion-item (click)="goto(\'eap\')">\n\n                    <ion-thumbnail item-left>\n\n                        <img src="assets/images/lite/eap.png">\n\n                    </ion-thumbnail>\n\n                    <ion-label>{{ settings?.eap_title }}</ion-label>\n\n                </ion-item>\n\n                <ion-item (click)="goto(\'about\')">\n\n                    <ion-thumbnail item-left>\n\n                        <img src="assets/images/lite/about.png">\n\n                    </ion-thumbnail>\n\n                    <ion-label>{{ settings?.about_your_eap_title }}</ion-label>\n\n                </ion-item>\n\n                <ion-item (click)="goto(\'book\')">\n\n                    <ion-thumbnail item-left>\n\n                        <img src="assets/images/lite/book.png">\n\n                    </ion-thumbnail>\n\n                    <ion-label>{{ settings?.book_an_appointment_title }}</ion-label>\n\n                </ion-item>\n\n                <ion-item (click)="goto(\'contact\')">\n\n                    <ion-thumbnail item-left>\n\n                        <img src="assets/images/lite/contact.png">\n\n                    </ion-thumbnail>\n\n                    <ion-label>{{ settings?.ask_a_question_title }}</ion-label>\n\n                </ion-item>\n\n            </ion-list>\n\n        </div>\n\n    </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Ionic\lifestreet_mobile_app\src\pages\lite-home\lite-home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__app_services_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_7__app_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], LiteHomePage);
    return LiteHomePage;
}());

//# sourceMappingURL=lite-home.js.map

/***/ }),

/***/ 678:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ProcessEmbed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ProcessLinks; });
/* unused harmony export ProcessBlocks */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckDiff; });
// Helper for processing embed video
var ProcessEmbed = function (doc) {
    // get all embedded elements
    var embeds = Array.from(doc.querySelectorAll(".wp-block-embed"));
    // iterate youtube figures
    embeds.forEach(function (embed) {
        if (typeof embed.getElementsByClassName === 'undefined') {
            return;
        }
        // gets url
        var url = embed.getElementsByClassName("wp-block-embed__wrapper")[0].innerHTML;
        // check what type of embed
        var isYT = embed.classList.contains("is-provider-youtube");
        var isSpotify = embed.classList.contains("is-provider-spotify");
        // Youtube
        if (isYT) {
            var splitUrl = url.split("?v=");
            var id = splitUrl.length >= 2 ? splitUrl[1] : '';
            url = id === '' ? '' : "https://www.youtube.com/embed/" + id;
            // Spotify
        }
        else if (isSpotify) {
            var splitUrl = url.split("playlist/");
            var id = splitUrl.length >= 2 ? splitUrl[1] : '';
            url = id === '' ? '' : "https://open.spotify.com/embed/playlist/" + id;
            // fallback will create a link instead
        }
        else {
            url = '';
        }
        // only create iframe when url is valid
        if (url !== '') {
            console.log('embed: ', embed);
            // creates iframe for embedding object
            var iframe = doc.createElement("iframe");
            iframe.src = url.trim();
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("width", "100%");
            iframe.setAttribute("height", "100%");
            embed.appendChild(iframe);
            // create link
        }
        else {
            var p = doc.createElement("p");
            var a = doc.createElement("a");
            var url_1 = embed.getElementsByClassName("wp-block-embed__wrapper")[0].innerHTML;
            a.innerHTML = url_1;
            a.setAttribute("href", url_1);
            a.setAttribute("target", "_blank");
            p.appendChild(a);
            embed.appendChild(p);
            embed.style.height = "auto";
        }
    });
};
// Process Links
var ProcessLinks = function (doc) {
    var links = Array.from(doc.getElementsByTagName('a'));
    links.forEach(function (link) {
        // checks element
        if (typeof link.addEventListener === 'undefined') {
            return;
        }
        // add listener to thank link
        link.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('process link', e, link.getAttribute('href'));
            var href = link.getAttribute('href');
            var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(href);
            if (valid) {
                //window.open(href, '_system', 'location=yes')
                if (cordova && cordova.InAppBrowser) {
                    window.open = cordova.InAppBrowser.open(href, "_system", "location=yes");
                }
            }
        }, false);
    });
};
var ProcessBlocks = function (content) {
    var blocks = content.split("\n\n");
    var customContent = "";
    blocks.forEach(function (block) {
        var setting = block.split("\n")[0]; // get the first comment tag setting
        setting = setting.replace("\\", "");
        // first check if an object string is available
        if (setting.indexOf("{") > 0) {
            // get object now
            var objSTR = setting.substring(setting.indexOf('{'), setting.lastIndexOf('}') + 1);
            var custom = JSON.parse(objSTR);
            console.log('custom setting: ', custom);
        }
        customContent += block;
    });
    return customContent;
};
var CheckDiff = function (first, second) {
    for (var i = 0; i < second.length; i++) {
        var index = undefined;
        while ((index = first.indexOf(second[i])) !== -1) {
            first.splice(index, 1);
        }
    }
    return first;
};
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ 697:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_services_auth_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_services_api_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_lite_home_lite_home__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_terms_conditions_terms_conditions__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_wellbeing_minute_wellbeing_minute__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_version__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_push_notification_push_notification__ = __webpack_require__(136);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var MyApp = /** @class */ (function () {
    function MyApp(app, platform, appVersion, events, statusBar, splashScreen, authService, apiService, alertCtrl, loadingCtrl, pushNotif) {
        var _this = this;
        this.app = app;
        this.platform = platform;
        this.appVersion = appVersion;
        this.events = events;
        this.authService = authService;
        this.apiService = apiService;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.pushNotif = pushNotif;
        this.user_id = null;
        this.isUser = null;
        this.isComplete = null;
        this.postID = null;
        this.user_id = null;
        this.checkRootPage();
        this.usernameDisplay = null;
        platform.ready().then(function () {
            // Branch initialization
            var handleBranch = function () {
                // only on devices
                if (!platform.is('cordova')) {
                    return;
                }
                var Branch = window['Branch'];
                console.log('Branch1', Branch);
                Branch.initSession().then(function (data) {
                    console.log('Branch2', data);
                    if (data['+clicked_branch_link']) {
                        var slug = { wb_slug: data['wb_slug'],
                            wb_id: data['id'] };
                        var userID = localStorage.getItem('userID');
                        if (userID) {
                            _this.nav.push(__WEBPACK_IMPORTED_MODULE_10__pages_wellbeing_minute_wellbeing_minute__["a" /* WellbeingMinutePage */], slug);
                        }
                    }
                });
            };
            statusBar.styleDefault();
            splashScreen.hide();
            handleBranch();
            if (_this.isApp()) {
                //this.version = this.appVersion.getVersionNumber();
                //console.log(this.version);
                _this.appVersion.getVersionNumber().then(function (version) {
                    console.log(version);
                    _this.version = version;
                });
            }
            else {
                _this.version = 'Testing';
            }
            // this is the script that will be triggered during the resume of application
            _this.onResumeSubscription = platform.resume.subscribe(function (e) {
                // console.log('RESUMED');
                events.publish('user:login', 'test', Date.now());
                // let checkLoader = this.loadingCtrl.create({});
                // checkLoader.present().then(() => {
                _this.refreshAppData();
                //   checkLoader.dismiss();
                // });
                _this.checkRootPage();
                handleBranch();
            });
            // platform.pause.subscribe((e) => {
            // let checkLoader2 = this.loadingCtrl.create({});
            // checkLoader2.present().then(() => {
            // this.refreshAppData();
            //   checkLoader2.dismiss();
            // });
            // });
            events.subscribe('user:login', function (user, time) {
                if (localStorage.getItem('username') === null) {
                    var userData = JSON.parse(localStorage.getItem('userData'));
                    _this.usernameDisplay = userData.user_login;
                }
                else {
                    _this.usernameDisplay = localStorage.getItem('username');
                }
                _this.checkRootPage();
            });
            events.subscribe('app:changeroot', function (root) {
                _this.rootPage = root;
            });
            // events for app service type changed
            events.subscribe('service:changed', function () {
                _this.checkRootPage();
            });
            console.log('this.usernameDisplay', _this.usernameDisplay);
            if (_this.usernameDisplay === null) {
                var userData = JSON.parse(localStorage.getItem('userData'));
                _this.usernameDisplay = userData ? userData.user_login : 'N/A';
            }
            // events for app push user ID
            events.subscribe('user:ID', function (ID) {
                _this.user_id = ID;
                console.log('push events.subscribe', _this.user_id);
                _this.pushNotif.filterUserPush(_this.user_id);
            });
        });
    }
    MyApp.prototype.refreshAppData = function () {
        this.userCheck();
        // localStorage.removeItem('tool');
        // localStorage.removeItem('trending');
        // localStorage.removeItem('webinar');
        // localStorage.removeItem('home_settings');
        // this.apiService.load();
    };
    MyApp.prototype.userCheck = function () {
        var _this = this;
        var userID = localStorage.getItem('userID');
        console.log('userID', userID);
        if (userID && this.authService.authenticated) {
            this.apiService.userExisting(userID).subscribe(function (data) {
                //console.log(data.data);
                if (data.data == false) {
                    console.log('user is deleted');
                    _this.authService.logOut().subscribe(function (data) {
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */];
                    }, function (error) { return console.log(error); });
                }
            }, function (error) { return console.log(error); });
        }
    };
    MyApp.prototype.logout = function () {
        var _this = this;
        console.log('logout button clicked in side menu');
        var logoutLoader = this.loadingCtrl.create({
            content: "Logging out..."
        });
        logoutLoader.present().then(function () {
            _this.authService.logOut().subscribe(function (data) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */];
                logoutLoader.dismiss();
            }, function (error) {
                console.log(error);
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */];
                logoutLoader.dismiss();
            });
        });
    };
    MyApp.prototype.goBacktoHome = function () {
        this.app.getRootNav().popToRoot();
    };
    MyApp.prototype.checkRootPage = function () {
        if (this.authService.authenticated) {
            var isLite = localStorage.getItem('company_service') === 'lite';
            this.rootPage = isLite ? __WEBPACK_IMPORTED_MODULE_7__pages_lite_home_lite_home__["a" /* LiteHomePage */] : __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */];
            // this.rootPage = HomePage;
        }
        else {
            this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */];
        }
    };
    MyApp.prototype.launchSite = function () {
        window.open("https://www.lifestreet.com.au/privacy-policy", '_system', 'location=yes');
    };
    MyApp.prototype.launchTermsAndConditions = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_9__pages_terms_conditions_terms_conditions__["a" /* TermsConditionsPage */]);
    };
    // called when destroy view
    MyApp.prototype.ngOnDestroy = function () {
        this.events.unsubscribe('user:login');
        this.events.unsubscribe('service:changed');
        this.events.unsubscribe('user:ID');
        this.onResumeSubscription.unsubscribe();
    };
    MyApp.prototype.isApp = function () {
        if (this.platform.is('cordova')) {
            return true;
        }
        return false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\Ionic\lifestreet_mobile_app\src\app\app.html"*/'<ion-menu [content]="mycontent" persistent="true" style="width: 200%">\n\n        <ion-content style="background-color: #7FA347;">\n\n            <ion-title style="text-align: center; background-color:#58595B; height: 115px; margin-top: -45px">\n\n                <img style="padding-top: 65px; padding-bottom: 10px" alt="logo" width="65%" height="auto" src="assets/images/lifestreet_home_logo.jpg">\n\n            </ion-title>\n\n            <ion-list style="padding-top: 15px;">\n\n                <div class="togglediv">\n\n                    <button style="height: 10vw" ion-button clear block text-left menuClose="left" (click)="goBacktoHome()"><span class="toggletext">HOME</span></button>\n\n                    <img src="assets/images/line_1.jpg">\n\n                </div>\n\n                <!--<div class="togglediv">\n\n                    <button ion-button clear block menuClose="left" (click)="launchSite()"><span class="toggletext" style="white-space: normal;">VISIT FULL SITE</span></button>\n\n                    <img src="assets/images/line_2.jpg">\n\n                </div>-->\n\n                <div class="togglediv">\n\n                    <button style="height: 10vw" ion-button clear block menuClose="left" (click)="launchTermsAndConditions()"><span class="toggletext" style="white-space: normal;">ABOUT LIFE STREET</span></button>\n\n                    <!--<img src="assets/images/line_3.jpg"> -->\n\n                </div>\n\n                <!--<div class="togglediv">\n\n                    <button style="height: 10vw" ion-button clear block menuClose="left" (click)="logout()"><span class="toggletext">LOGOUT</span></button>\n\n                </div> -->   \n\n            </ion-list>\n\n        </ion-content>\n\n        <ion-footer style="background-color: #7FA347;">\n\n                <div style="color: white; text-align: center; font-size: 12px; margin: 0; padding: 0">\n\n                        <div>\n\n                            <p style="padding-bottom: -10px">Username: <br/> {{ usernameDisplay }}</p>\n\n                            <p>App Version: {{ version }}</p>\n\n                            <p style="left:0%"><button clear ion-button size="small" menuClose="left" (click)="launchSite()" style="color: white; font-size:12px; height: 50%;">Privacy Policy</button> <button clear ion-button size="small" menuClose="left" style="color: white; font-size: 12px; height: 50%;">|</button> <button ion-button clear size="small" menuClose="left" (click)="logout()" style="color: white; font-size: 12px; height: 50%;">Log Out</button></p>\n\n                        </div>\n\n                </div>\n\n        </ion-footer>        \n\n</ion-menu>\n\n\n\n<ion-nav #mycontent [root]="rootPage" swipeBackEnabled="true">\n\n</ion-nav>\n\n'/*ion-inline-end:"D:\Ionic\lifestreet_mobile_app\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_version__["a" /* AppVersion */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__app_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_5__app_services_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_12__providers_push_notification_push_notification__["a" /* PushNotificationProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 698:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticlePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ArticlePage = /** @class */ (function () {
    function ArticlePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.article = null;
        this.article = this.navParams.get('article');
        console.log(this.article);
    }
    ArticlePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ArticlePage');
    };
    ArticlePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-article',template:/*ion-inline-start:"D:\Ionic\lifestreet_mobile_app\src\pages\article\article.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{ article.post_title }}</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <div [innerHTML]="article.post_content"></div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Ionic\lifestreet_mobile_app\src\pages\article\article.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], ArticlePage);
    return ArticlePage;
}());

//# sourceMappingURL=article.js.map

/***/ }),

/***/ 699:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the VideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VideoPage = /** @class */ (function () {
    function VideoPage(navCtrl, sanitizer, navParams) {
        this.navCtrl = navCtrl;
        this.sanitizer = sanitizer;
        this.navParams = navParams;
        this.video = null;
        this.video = this.navParams.get('video');
        /*if(this.video){
          this.video.meta.forEach((meta) =>{
              if(meta.meta_key == 'video_embed_code') {
                this.video_embed = sanitizer.bypassSecurityTrustHtml(meta.meta_value);
                //console.log(this.video_embed);
              }
          });
        }*/
        console.log(this.video);
    }
    VideoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VideoPage');
    };
    VideoPage.prototype.videoURL = function () {
        this.video_embed = this.sanitizer.bypassSecurityTrustResourceUrl(this.video.video_src);
        return this.video_embed;
    };
    VideoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-video',template:/*ion-inline-start:"D:\Ionic\lifestreet_mobile_app\src\pages\video\video.html"*/'<!--\n\n  Generated template for the VideoPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{ video.post_title }}</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <div [innerHTML]="video.post_content"></div><br />\n\n  <div>\n\n      <iframe width="100%" height="500" [src]="videoURL()"></iframe>\n\n  </div>\n\n  <!--<div [innerHTML]="video_embed" ></div>-->\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Ionic\lifestreet_mobile_app\src\pages\video\video.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], VideoPage);
    return VideoPage;
}());

//# sourceMappingURL=video.js.map

/***/ }),

/***/ 700:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SafeHtmlPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the SafeHtmlPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var SafeHtmlPipe = /** @class */ (function () {
    /**
     * Takes a value and makes it lowercase.
     */
    function SafeHtmlPipe(sanitized) {
        this.sanitized = sanitized;
    }
    SafeHtmlPipe.prototype.transform = function (value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    };
    SafeHtmlPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'safeHtmlPipe',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], SafeHtmlPipe);
    return SafeHtmlPipe;
}());

//# sourceMappingURL=safe-html.js.map

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_services_api_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tool_tool__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__webinar_webinar__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__connect_connect__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__wellbeing_minute_wellbeing_minute__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_services_auth_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__booking_booking__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lite_home_lite_home__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__login_login__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_push_notification_push_notification__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__wellbeing_minute_constants__ = __webpack_require__(135);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, loadingCtrl, apiService, authService, platform, events, alertCtrl, pushNotif) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.apiService = apiService;
        this.authService = authService;
        this.platform = platform;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.pushNotif = pushNotif;
        this.article = null;
        this.webinar = null;
        this.tool = null;
        this.video = null;
        this.trending = null;
        this.id = null;
        this.user_article = {};
        this.user_webinar = {};
        this.user_tool = {};
        this.user_trending = {};
        this.home_settings = null;
        this.user_trending_last_update = null;
        this.trending_updated_date = null;
        this.user_wb_minute = false;
        this.check_user_trending = false;
        this.is_loading = true;
        this.loader = null;
        this.loaderTimeout = null;
        this.check_user_wb_minute = null;
        console.log('home construct');
        this.id = localStorage.getItem('userID');
        this.initApi();
        this.show_wb_minute_user = [];
        this.onResumeSubscription = this.platform.resume.subscribe(function () {
            // do something meaningful when the app is put in the foreground
            _this.initApi();
        });
        // listen to event from other pages
        this.events.subscribe('app:checkservice', function (cb) {
            // checks service and update other info
            _this.checkLiteVersion(cb);
        });
        this.events.subscribe('app:checkminute', function () {
            _this.checkMinute();
        });
    }
    HomePage.prototype.ionViewDidLoad = function () {
        // stop when still not set
        if (localStorage.getItem('user_trending_check') == null ||
            localStorage.getItem('user_trending') == null ||
            localStorage.getItem('user_webinar') == null ||
            localStorage.getItem('user_tool') == null) {
            return;
        }
        this.check_user_trending = JSON.parse(localStorage.getItem('user_trending_check'));
        if (this.check_user_trending) {
            this.user_trending = JSON.parse(localStorage.getItem('user_trending')).data;
            this.user_webinar = JSON.parse(localStorage.getItem('user_webinar')).data;
            this.user_tool = JSON.parse(localStorage.getItem('user_tool')).data;
        }
    };
    // called when destroy view
    HomePage.prototype.ngOnDestroy = function () {
        this.hideLoader();
        console.log('on destroy');
        // always unsubscribe your subscriptions to prevent leaks
        this.onResumeSubscription.unsubscribe();
        this.events.unsubscribe('app:checkservice');
        this.events.unsubscribe('app:checkminute');
    };
    HomePage.prototype.contact = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__connect_connect__["a" /* ConnectPage */]);
    };
    HomePage.prototype.scheduleSession = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__booking_booking__["a" /* BookingPage */]);
    };
    HomePage.prototype.cardAction = function (data) {
        if (data === null) {
            console.error('no data provided');
            return;
        }
        console.log(data.post_type);
        switch (data.post_type) {
            case 'webinar':
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__webinar_webinar__["a" /* WebinarPage */], {
                    webinar: data
                });
                break;
            case 'tool':
                //console.log(data);
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__tool_tool__["a" /* ToolPage */], {
                    tool: data
                });
                break;
            case 'user_webinar':
                console.log(data);
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__webinar_webinar__["a" /* WebinarPage */], {
                    webinar: data
                });
                break;
            case 'user_tool':
                console.log(data);
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__tool_tool__["a" /* ToolPage */], {
                    tool: data
                });
                break;
        }
    };
    HomePage.prototype.doRefresh = function (refresher) {
        this.initApi();
        refresher.complete();
    };
    HomePage.prototype.iniClean = function () {
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
    };
    HomePage.prototype.initApi = function () {
        var _this = this;
        // stops initialization when its in progress
        if (this.loader) {
            return;
        }
        this.checkMinute();
        this.is_loading = true;
        // create loader
        this.loader = this.loadingCtrl.create();
        // show loader
        this.loader.present().then(function (res) {
            // check version first before proceeding
            _this.checkLiteVersion(function () {
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
                console.log('api 1');
                // this.iniClean()
                if (localStorage.getItem('userID') == null) {
                    return;
                }
                // prepare to load user
                var loadUser = _this.apiService.loadUserContent(localStorage.getItem('userID'));
                console.log('api 2');
                // load user apis
                loadUser.then(function () {
                    _this.is_loading = false;
                    // populate trending post, webinar, tools
                    var trendings = _this.apiService.loadPost();
                    trendings.trendingPost().then(function (_a) {
                        var data = _a.data;
                        return _this.trending = data;
                    });
                    trendings.trendingWebinar().then(function (_a) {
                        var data = _a.data;
                        return _this.webinar = data;
                    });
                    trendings.trendingTool().then(function (_a) {
                        var data = _a.data;
                        return _this.tool = data;
                    });
                    // update home settings
                    _this.home_settings = JSON.parse(localStorage.getItem('home_settings')).data;
                    console.log('api 3');
                    // fetch user trending check
                    _this.apiService.userTrendingCheck(localStorage.getItem('userID')).then(function (res) {
                        console.log('api 4');
                        _this.check_user_trending = JSON.parse(res.status);
                        localStorage.setItem('user_trending_check', res.status);
                        if (_this.check_user_trending) {
                            _this.user_trending = JSON.parse(localStorage.getItem('user_trending')).data;
                            _this.user_webinar = JSON.parse(localStorage.getItem('user_webinar')).data;
                            _this.user_tool = JSON.parse(localStorage.getItem('user_tool')).data;
                        }
                        _this.hideLoader();
                    }, function (err) {
                        _this.hideLoader();
                        console.log(err);
                    });
                    // fetch for trending updates
                    _this.apiService.trendingUpdated().subscribe(function (data) {
                        console.log('api 5');
                        // update trending update date
                        _this.trending_updated_date = data.data.trending_updated_date;
                        if (JSON.parse(localStorage.getItem('trending_last_update')) != _this.trending_updated_date) {
                            localStorage.setItem('trending_last_update', JSON.stringify(_this.trending_updated_date));
                        }
                    }, function (error) { return console.log(error); });
                });
            });
        });
        // add expiration for loader | note : do not use 'duration' may cause error
        this.loaderTimeout = setTimeout(function () {
            _this.hideLoader();
        }, 10000);
    };
    HomePage.prototype.wellbeingView = function () {
        if (!this.check_user_wb_minute || !this.check_user_wb_minute.data) {
            var alert_1 = this.alertCtrl.create({
                title: 'Error',
                subTitle: "<br><small>[ERROR][APP] A500</small><br> Invalid Wellbeing Data</b>",
                buttons: ['OK']
            });
            alert_1.present();
            return;
        }
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__wellbeing_minute_wellbeing_minute__["a" /* WellbeingMinutePage */], { wb_minute: this.show_wb_minute_user[0] });
    };
    HomePage.prototype.checkLiteVersion = function (callback) {
        var _this = this;
        // checks if compid is available [IMPORTANT]
        var compid = localStorage.getItem('compId');
        if (!compid) {
            console.log('company id is not available');
            // fetch company id
            this.apiService
                .getCompanyId().then(function () {
                // check the lite version again
                _this.checkLiteVersion(callback);
            })
                .catch(function (error) {
                var alert = _this.alertCtrl.create({
                    title: 'Internal Server Error',
                    subTitle: "<br><small>[ERROR][APP] A002</small><br>There's a problem fetching the service type. <br><br> <b>Please try again later.</b>",
                    buttons: ['OK']
                });
                alert.present();
                // dismiss loader
                _this.hideLoader();
            });
            return;
        }
        // if company id == null
        if (compid == 'null') {
            var alert_2 = this.alertCtrl.create({
                title: 'Error',
                subTitle: "<br><small>[ERROR][LITE] L003</small><br>Invalid company ID. <br><br> <b>Your must need to re-login.</b>",
                buttons: [{
                        text: 'OK',
                        handler: function () {
                            _this.authService.logOut().subscribe(function (data) {
                                _this.events.publish('app:changeroot', __WEBPACK_IMPORTED_MODULE_10__login_login__["a" /* LoginPage */]);
                                _this.loader.dismiss();
                            }, function (error) {
                                console.log(error);
                                _this.events.publish('app:changeroot', __WEBPACK_IMPORTED_MODULE_10__login_login__["a" /* LoginPage */]);
                                _this.loader.dismiss();
                            });
                        }
                    }]
            });
            alert_2.present();
            return;
        }
        // check for any updates in the server
        this.apiService
            .loadPost()
            .info(compid)
            .then(function (data) {
            console.log('company service : ', localStorage.getItem('company_service'));
            // validate company service type
            if (localStorage.getItem('company_service') && localStorage.getItem('company_service') === 'lite') {
                // dismiss loader first
                _this.hideLoader();
                // publish an event for service changed
                _this.events.publish('service:changed');
                // redirect to lite version
                _this.events.publish('app:changeroot', __WEBPACK_IMPORTED_MODULE_9__lite_home_lite_home__["a" /* LiteHomePage */]);
            }
            else if (typeof callback !== 'undefined') {
                // proceed to load apis
                callback();
            }
        })
            .catch(function (error) {
            console.error('error : ', error);
            var eTitle = "";
            var eMessage = "";
            var buttons = [];
            // error 500
            if (error.status == 500) {
                eTitle = "Error";
                eMessage = "<br><small>[ERROR][APP] A004</small><br> The company ID does not exist. <br><br><b>You must need to re-login.</b>";
                buttons.push({
                    text: 'OK',
                    handler: function () {
                        _this.authService.logOut().subscribe(function (data) {
                            _this.events.publish('app:changeroot', __WEBPACK_IMPORTED_MODULE_10__login_login__["a" /* LoginPage */]);
                        }, function (error) {
                            console.log(error);
                            _this.events.publish('app:changeroot', __WEBPACK_IMPORTED_MODULE_10__login_login__["a" /* LoginPage */]);
                        });
                    }
                });
                // error no connection
            }
            else if (error.status === 0) {
                eTitle = 'Connection Error';
                eMessage = "<br><small>[ERROR][APP] A001</small><br> It looks like you don't have an internet connection. <br><br> <b>Please try again.</b>";
                buttons.push("OK");
                // setback error
            }
            else {
                eTitle = 'Error';
                eMessage = eMessage = "<br><small>[ERROR][APP] A005</small><br> " + JSON.parse(error._body).message;
                buttons.push("OK");
            }
            var alert = _this.alertCtrl.create({
                title: eTitle,
                subTitle: eMessage,
                buttons: buttons
            });
            alert.present();
            // dismiss loader first
            _this.hideLoader();
            var lsSetting = localStorage.getItem('home_settings');
            var lsTrending = localStorage.getItem('trending');
            var lsWebinar = localStorage.getItem('webinar');
            var lsTool = localStorage.getItem('tool');
            // populate data
            if (lsSetting) {
                _this.home_settings = JSON.parse(lsSetting).data;
            }
            if (lsTrending) {
                _this.trending = JSON.parse(lsTrending).data;
            }
            if (lsWebinar) {
                _this.webinar = JSON.parse(lsWebinar).data;
            }
            if (lsTool) {
                _this.tool = JSON.parse(lsTool).data;
            }
        });
    };
    HomePage.prototype.checkMinute = function () {
        var _this = this;
        this.check_user_wb_minute = null;
        this.user_wb_minute = false;
        this.show_wb_minute_user = [];
        //wb_minute_check current user and expiry
        this.apiService.getUserWbMinute(this.id).subscribe(function (data) {
            // validate data to avoid errors when wellbeing minute is not available
            if (!data.data) {
                _this.pushNotif.isUser = "no";
                _this.pushNotif.triggerNotification("no", _this.id);
                return;
            }
            _this.check_user_wb_minute = data;
            // trigger notification
            _this.pushNotif.postID = data.data.ID;
            _this.pushNotif.isComplete = data.data.status;
            if (data.data.status == __WEBPACK_IMPORTED_MODULE_12__wellbeing_minute_constants__["a" /* STATUS_COMPLETED */]) {
                _this.pushNotif.isUser = "no";
            }
            else if (_this.pushNotif.postID != null && data.data.status != __WEBPACK_IMPORTED_MODULE_12__wellbeing_minute_constants__["a" /* STATUS_COMPLETED */]) {
                _this.pushNotif.isUser = "yes";
            }
            _this.pushNotif.triggerNotification(_this.pushNotif.isUser, _this.id);
            if (_this.check_user_wb_minute.data.post_expired == false &&
                _this.check_user_wb_minute.data.status != __WEBPACK_IMPORTED_MODULE_12__wellbeing_minute_constants__["a" /* STATUS_COMPLETED */]) {
                _this.user_wb_minute = true;
                _this.show_wb_minute_user.push({
                    id: _this.check_user_wb_minute.data.ID,
                    post_content: _this.check_user_wb_minute.data.post_content,
                    post_title: _this.check_user_wb_minute.data.post_title
                });
            }
        });
    };
    HomePage.prototype.hideLoader = function () {
        this.is_loading = false;
        if (this.loader != null) {
            this.loader.dismissAll();
            this.loader = null;
        }
        if (this.loaderTimeout) {
            clearTimeout(this.loaderTimeout);
            this.loaderTimeout = null;
        }
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"D:\Ionic\lifestreet_mobile_app\src\pages\home\home.html"*/'<ion-header no-border>\n\n    <ion-navbar color="navbar" align-title="center">\n\n      <ion-buttons end>\n\n          <button menuToggle ion-button icon-only>\n\n              <ion-icon name="menu"></ion-icon>\n\n          </button>\n\n      </ion-buttons>\n\n      <ion-title style="position: absolute; top: 0;left: -10px; padding: 0 50px 1px; width: 105%; height: 110%;text-align: center;">\n\n          <img alt="logo" width="200px" height="175%" src="assets/images/lifestreet_home_logo.jpg">\n\n      </ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n\n\n  <ion-content class="home-content" no-padding>\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content pullingText="Pull to refresh..." refreshingText="Refreshing...">\n\n        </ion-refresher-content>\n\n    </ion-refresher>\n\n\n\n    <div *ngIf="is_loading == false">\n\n\n\n        <ion-grid style="padding: 0; margin: 0; margin-bottom: 0">\n\n            <ion-row>\n\n                <ion-col id="wb_minute_notif_bar" *ngIf="user_wb_minute">\n\n                    <img src="assets/images/lifestreet_wb_logo.png" alt="" style="width: 40vw; max-width: 220px;">\n\n                    <h3>{{ show_wb_minute_user[0].post_title }}</h3>\n\n                    <button ion-button full (click)="wellbeingView()" style="background-color: #FCB036; letter-spacing: 1.2px;">View Now</button>\n\n                </ion-col>    \n\n            </ion-row>\n\n        </ion-grid>\n\n\n\n        <!-- \n\n            User Related Part\n\n        -->\n\n        <div *ngIf="check_user_trending == true && home_settings != null" class="dynamic-event-div">\n\n            <h3 class="dynamic-event-title" >\n\n                {{ home_settings?.company_app_event_title }}\n\n            </h3>\n\n        </div>\n\n        <ion-grid *ngIf="check_user_trending == true" style="padding: 0; margin: 0; margin-bottom: 0">\n\n            <ion-row *ngIf="user_webinar != null" class="padded-row row-panels light-panel" (click)="cardAction(user_webinar)">\n\n                    <ion-col class="col-watch-logo cpt-center" col-6>\n\n                        <img width="100%" alt="assets/images/watch_logo.png" src="{{ home_settings?.watch_logo }}" />\n\n                    </ion-col>\n\n                    <ion-col class="col-title-center">\n\n                        <h3 class="col-panel-title">\n\n                            {{ \n\n                                (home_settings?.company_webinar_short_app_name != null && home_settings?.company_webinar_short_app_name.trim() != \'\') ? \n\n                                    home_settings?.company_webinar_short_app_name: user_webinar?.post_title\n\n                            }}\n\n                        </h3> \n\n                    </ion-col> \n\n                </ion-row>  <!-- watch part -->\n\n        \n\n                <ion-row *ngIf="user_tool != null" class="row-panels dark-panel" (click)="cardAction(user_tool)">\n\n                    <ion-col class="col-tool-title cpt-center" col-7>\n\n                        <div>\n\n                            <h3 class="col-panel-title">\n\n                                {{ \n\n                                    (home_settings?.company_tool_short_app_name != null && home_settings?.company_tool_short_app_name.trim() != \'\') ? \n\n                                        home_settings?.company_tool_short_app_name : user_tool?.post_title\n\n                                }}\n\n                            </h3>\n\n                        </div>\n\n                    </ion-col>\n\n                    <ion-col class="col-do-logo cpt-center">\n\n                        <img height="91.5%" width="91.5%" alt="assets/images/do_logo.png" src="{{ home_settings?.do_logo }}" />\n\n                    </ion-col>\n\n                </ion-row> <!-- tool part -->\n\n            \n\n                <ion-row *ngIf="home_settings != null" class="padded-row row-panels light-panel" (click)="scheduleSession()">\n\n                    <ion-col class="col-book-logo cpt-center" col-6>\n\n                        <img height="100%" width="100%" alt="assets/images/book_logo.png" src="{{ home_settings?.book_logo }}" />\n\n                    </ion-col>\n\n                    <ion-col>\n\n                        <div class="col-title-center">\n\n                            <h3 class="col-panel-title">{{ home_settings?.book_title }}</h3>\n\n                        </div>                        \n\n                    </ion-col>\n\n                </ion-row> <!-- book part -->\n\n            \n\n                <ion-row *ngIf="home_settings != null" class="row-panels dark-panel" (click)="contact()">\n\n                    <ion-col class="col-tool-title cpt-center" col-7>\n\n                        <div style="width: 80%;">\n\n                            <h3 class="col-panel-title cpt-center">{{ home_settings?.ask_title }}</h3>\n\n                        </div>\n\n                    </ion-col>\n\n                    <ion-col class="col-ask-logo cpt-center">\n\n                        <img height="100%" width="100%" alt="assets/images/ask_logo.png" src="{{ home_settings?.ask_logo }}" />\n\n                    </ion-col>\n\n                </ion-row> <!-- ask part -->\n\n        </ion-grid>\n\n\n\n\n\n\n\n        <!--\n\n          Trending Topics Default\n\n        -->\n\n\n\n        <div *ngIf="home_settings !=null">\n\n            <div *ngIf="check_user_trending == true" class="dynamic-event-div">\n\n                <h3 class="dynamic-event-title">\n\n                    {{ home_settings?.app_events_title }}\n\n                </h3>\n\n            </div>\n\n\n\n            <ion-grid style="padding: 0; margin: 0; margin-bottom: 0">\n\n                <ion-row class="padded-row row-panels light-panel" (click)="cardAction(webinar)">\n\n                    <ion-col class="col-watch-logo cpt-center" col-6>\n\n                        <img height="100%" width="100%" alt="assets/images/watch_logo.png" src="{{ home_settings?.watch_logo }}" />\n\n                    </ion-col>\n\n                    <ion-col>\n\n                        <div class="col-title-center">\n\n                            <h3 class="col-panel-title">{{ home_settings?.webinar_title.post_title }}</h3>\n\n                        </div>\n\n                    </ion-col> \n\n                </ion-row>  <!-- watch part -->\n\n\n\n                <ion-row class="row-panels dark-panel" (click)="cardAction(tool)">\n\n                    <ion-col class="col-tool-title cpt-center" col-7>\n\n                        <div style="width: 95%;">\n\n                            <h3 class="col-panel-title">{{ home_settings?.tool_name.post_title }}</h3>\n\n                        </div>\n\n                    </ion-col>\n\n                    <ion-col class="col-do-logo cpt-center">\n\n                        <img height="91.5%" width="91.5%" alt="assets/images/do_logo.png" src="{{ home_settings?.do_logo }}" />\n\n                    </ion-col>\n\n                </ion-row> <!-- tool part -->\n\n            \n\n                <ion-row class="padded-row row-panels light-panel" (click)="scheduleSession()">\n\n                    <ion-col class="col-book-logo cpt-center" col-6>\n\n                        <img height="100%" width="100%" alt="assets/images/book_logo.png" src="{{ home_settings?.book_logo }}" />\n\n                    </ion-col>\n\n                    <ion-col style="text-align: center">\n\n                        <div class="col-title-center">\n\n                            <h3 class="col-panel-title">{{ home_settings?.book_title }}</h3>\n\n                        </div>\n\n                    </ion-col>\n\n                </ion-row> <!-- book part -->\n\n            \n\n                <ion-row class="row-panels dark-panel" (click)="contact()">\n\n                    <ion-col class="col-tool-title cpt-center" col-7>\n\n                        <div style="width: 80%;">\n\n                            <h3 class="col-panel-title cpt-center">{{ home_settings?.ask_title }}</h3>\n\n                        </div>\n\n                    </ion-col>\n\n                    <ion-col class="col-ask-logo cpt-center">\n\n                        <img height="100%" width="100%" alt="assets/images/ask_logo.png" src="{{ home_settings?.ask_logo }}" />\n\n                    </ion-col>\n\n                </ion-row> <!-- ask part -->\n\n\n\n                \n\n            </ion-grid> <!-- grid -->\n\n\n\n        </div>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Ionic\lifestreet_mobile_app\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__app_services_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_7__app_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_11__providers_push_notification_push_notification__["a" /* PushNotificationProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[368]);
//# sourceMappingURL=main.js.map