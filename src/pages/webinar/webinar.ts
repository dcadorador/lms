import { Component } from '@angular/core';
import { Events, NavController, NavParams, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ApiService } from '../../app/services/api.service';
import { AuthService } from '../../app/services/auth.service';
import { UserService } from '../../app/services/user.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-webinar',
  templateUrl: 'webinar.html',
})
export class WebinarPage {
 webinar: any = null;
 webinar_video: SafeResourceUrl;
 form_structure: any = null;
 form_assessed: any = false;
 rate_form: any;
 loading: Loading;
 private loader: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apiService: ApiService,
    public authService: AuthService,
    public sanitizer: DomSanitizer,

    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public userService: UserService,
    private events: Events
  ) 
    {
      this.webinar = this.navParams.get('webinar');
      // console.log(this.webinar.post_type);
      this.loader = this.loadingCtrl.create({ duration: 10000 });
      this.loader.present().then(() => { 
        this.apiService.postForm(23).subscribe(
          data => {
              console.log(data.data.structure);
              this.rate_form = data.data.structure;
          },
          error => {
            console.log(error)
            this.hideLoader()
          }
        );
        this.apiService.postForm(this.webinar.form.id).subscribe(
            data => {
                this.form_structure = data.data.structure;
            },
            error => {
              console.log(error)
              this.hideLoader()
            }
        );

        let uid = localStorage.getItem('userID')

        this.apiService.userForm(uid, this.webinar.form.id).subscribe(
          data => {
            this.form_assessed = data.data;
            this.userService.userWebinarFormAssessed(data.data);
            this.hideLoader();
          },
          error => {
            console.log(error)
            this.hideLoader();
          }
        );
      });
  }

  goToConnect() {
    let type = this.webinar.post_type == 'user_webinar' ? 'user_webinar' : 'webinar';
    this.navCtrl.push('ConnectPresenterPage',{'type': type});
  }

  ionViewDidLoad() {
    
  }

  ionViewWillEnter() {
    // notify app home to check service again
    this.events.publish('app:checkservice')
    this.prepareUrl()
    this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
        duration: 10000
    });
    if (this.form_assessed) {
        this.loading.present();
    }
  }

  prepareUrl() {

    let randomhash = Math.random().toString(36).substring(7);
    let url = this.webinar.video + '?hash=' + randomhash;
    let santizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.webinar_video = santizedUrl;
  }

  ionViewWillLeave() {
    this.form_assessed = false
    this.hideLoader()
  }

  doRefresh(refresher) {
    this.loader = this.loadingCtrl.create({ duration: 1000 });
    this.loader.present();
    this.prepareUrl();
    refresher.complete();
  }
  
  handleIFrameLoadEvent(): void {
    this.hideLoader();
  }

  /*youtubeURL() {
    this.webinar_video = this.sanitizer.bypassSecurityTrustResourceUrl(this.webinar.video);
    // console.log(this.webinar_video);
    return this.webinar_video;
  }*/

  register(){

    this.navCtrl.push('WebinarModalPage', { 'form' : this.form_structure });
  }

  userFormAssessed(){
    return this.userService.getUserWebinarFormAssessed();
  }

  ratePresenter() {
    let type = this.webinar.post_type == 'user_webinar' ? 'user_webinar' : 'webinar';
    this.navCtrl.push('RatePage', { 'rate' : this.rate_form, 'type' : type });
  }

  hideLoader() {
    if (this.loader != null) {
      this.loader.dismiss()
      this.loader = null
    }

    if (this.loading != null) {
      this.loading.dismiss()
      this.loading = null
    }
  }
}
