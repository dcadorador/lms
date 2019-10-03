import { Component, ViewChild } from '@angular/core';
import { Content, Events, IonicPage, NavController, NavParams, LoadingController, ViewController, AlertController, Platform } from 'ionic-angular';
import { SafeResourceUrl,DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../../app/services/api.service';
import { STATUS_NOT_STARTED, STATUS_NOT_COMPLETED, STATUS_COMPLETED } from './constants';
import { ProcessBlocks, ProcessLinks, CheckDiff } from './helpers';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-wellbeing-minute',
  templateUrl: 'wellbeing-minute.html'
})
export class WellbeingMinutePage {

  video_embed: SafeResourceUrl;
  logo: any = null;
  wb_id: number = 0;
  wb_minute: any= null;
  wb_minute_title: any=null;
  wb_minute_content: any = null;
  wb_minute_quiz: any=[];
  wb_base_url: String = null;
  wb_minute_close_text: String = "Finish";
  wb_style = {
    header: '#58595b',
    background: '#fcb036',
    text: '#ffffff',
    button: '#58595b',
    button_text: '#ffffff'
  }
  wb_status: number = null;
  input: any = [];
  is_loading: boolean = true;
  is_taking_quiz: boolean = null;
  loader: any = null;
  user_id: string = null;
  user_wb_minute:boolean = false;
  id : number = 0;
  link : any =null;
  push_user_id: any = null;

  @ViewChild(Content) content: Content;
   
  constructor(
    public navCtrl: NavController, 
    private loadingCtrl: LoadingController,
    public navParams: NavParams,
    private apiService: ApiService,
    public sanitizer: DomSanitizer,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private events: Events,
    protected platform: Platform,
  ) {

    // only allow standard service for this
    if (localStorage.getItem('company_service') === 'lite') {
      this.navCtrl.popToRoot()
      return
    }

     this.user_id = localStorage.getItem('userID');

    if (!this.user_id) {
        this.events.publish('app:changeroot', LoginPage);
        return
     }

     this.wb_minute = this.navParams.get('wb_minute');
     this.wb_id = this.navParams.get('id');
     this.logo ="assets/images/lifestreet_wb_logo.png";
     
     // create loader
     this.loader = this.loadingCtrl.create({ duration: 10000 });
     this.loader.present().then(() => {    

         if (this.wb_minute == undefined && this.wb_id == undefined){           
            this.checkMinute(this.user_id);          
          }else{
         // TODO determine id first
         let id = this.wb_minute ? this.wb_minute.id : this.wb_id;
          this.getWbMinute(id);
         }       
     });

  }
 
  ionViewWillEnter() {
      this.viewCtrl.showBackButton(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WellbeingMinutePage');
  }

  processPostMeta(metas) {
    // validate post meta
    if (metas) {
      // iterate minute post metas
      metas.forEach(meta => {
          this.getQuiz(meta)
          this.getStyles(meta)
          this.getCloseText(meta)
      })

    }

    // sets toolbar style
    let toolbar = document.getElementsByTagName('page-wellbeing-minute')[0].getElementsByClassName("toolbar-background")[0]
    if (toolbar instanceof HTMLElement) {
      toolbar.style.backgroundColor = this.wb_style.header
    }

    this.wb_style.button = this.wb_style.header == this.wb_style.background ? 'rgba(0, 0, 0, 0.5)' : this.wb_style.header
    this.wb_style.button_text = this.wb_style.button == this.wb_style.text ? this.invertHex(this.wb_style.button) : this.wb_style.text


  }

  processPostStatus(status) {
    this.wb_status = status

    // when status is still null, then it should be started
    console.log('wb_status', this.wb_status)
    if (this.wb_status == STATUS_NOT_STARTED || this.wb_status == null) {
      this.wb_status = STATUS_NOT_STARTED

      // update to start / not completed
      this.apiService.updateWellbeingMinute(
        this.user_id, {
          wb_id: this.wb_minute.ID, 
          status: STATUS_NOT_COMPLETED,
          action: 'change_status'
        }
      ).subscribe()
    } else if (this.wb_status == STATUS_COMPLETED) {
      this.showAlert('Info', 'Wellbeing Minute has been completed, you will be redirect back to home page', () => this.goback())
      return
    }
  }

  // get styles from meta
  getStyles(meta) {

    // header
    if (
      meta.meta_key === 'header_color_style' &&
      meta.meta_value !== ''
    ) {
      this.wb_style.header = meta.meta_value
      console.log('new header: ', this.wb_style.header)

    // background
    } else if (
      meta.meta_key === 'background_color_style' &&
      meta.meta_value !== ''
    ) {
      this.wb_style.background = meta.meta_value
      console.log('new background: ', this.wb_style.background)

    // text
    } else if (
      meta.meta_key === 'text_color_style' &&
      meta.meta_value !== ''
    ) {
      this.wb_style.text = meta.meta_value
      console.log('new text: ', this.wb_style.text)

    }
  }

  // get minute quiz
  getQuiz(meta) {

        

    // look for the quiz
    if (

      meta.meta_key === 'wellbeing_minutes_select_quiz' &&

      meta.meta_value !== ''

    ) {



      // check if base url is available

      if (this.wb_base_url == null) {

        console.error('No base url for wellbeing minute quiz fetched', this.wb_base_url)

        return

      }



      console.log('quiz id: ', meta.meta_value)
      this
        .apiService
        .postForm(meta.meta_value)
        .subscribe(
          data => {
            let quiz = data.data.structure
            quiz.has_description = true
            quiz.has_title = true
            quiz.input_index = []
            this.wb_minute_quiz.push(quiz)
            this.is_taking_quiz = true
          },
          error => {
            console.log('form data error: ', error)
          }
        )


    }

  }

  getCloseText(meta) {
    if (meta.meta_key === 'close_wellbeing_minute_button_text') {
      // this.wb_minute_close_text = meta.meta_value
      let text = meta.meta_value.toLowerCase()
      this.wb_minute_close_text = text
      if (text.length > 0) {
        this.wb_minute_close_text = text.charAt(0).toUpperCase() + text.slice(1)
      }
    }
  }

  getItemBG(i) {
    i = i + 1;
    if(i % 2 == 1){
      return 'white'
    } else {
      return '#DCDDDE';
    }
  }

  onChange(choice, id, index, quiz){
    console.log('index_' + id + ' ' + choice);
    let idx = 'index_' + id;
    let obj = [];
    obj.push(idx);
    obj.push(choice);
    let objidx = null;
    this.input.forEach(function(arr, i){
        if(arr[0] == idx){
          objidx = i;
        }
    });
    if(objidx !== null && this.input.length > 0){
      this.input.splice(objidx,1);
    } else {
      quiz.input_index.push(index + 1);
    }
    this.input.push(obj);
  }

  onSubmitQuiz(quiz) {
    // prevent form from submitting when there is no form id provided
    if (!quiz) {
        this.showAlert('Form Error', '<br><small>[ERROR][APP] A100</small><br> Cannot submit now <br><br> <b>Please try to refresh the page.</b>')
        return
    }

    /**
     * DECLARE VARIABLES
     */
    let field_counter = 0;
    let tool_fields = quiz.fields;
    let question_num = [];
    let input_num = quiz.input_index;
    let missing_input = '';

    /**
     * Loop through the form fields that is required
     */
    tool_fields.forEach((field, index) =>{
      if(field.isRequired == true) {
        field_counter = field_counter + 1;
        question_num.push(index + 1)
      }
    });

    /**
     * Run the checker to see which fields are missing
     */
    // console.log('question number: ', question_num)
    // console.log('input_numbeer: ', input_num)
    let missing_num = CheckDiff(question_num, input_num);
    console.log(missing_num);

    /**
     * Create the missing input message
     */
    missing_num.forEach((item) => {
        let n_item = item + ',';
        missing_input = missing_input + ' ' + n_item;
    });
    missing_input = missing_input.replace(/,\s*$/, "");

    /**
     * Determine if the input number is the same, if not
     * then show error, if the same submit to the api.
     */
    if(this.input.length < field_counter){
      this.showAlert('Quiz Form Error', 'Please complete quiz form on number ' + missing_input + '.')
    } else {
      let loader = this.loadingCtrl.create({content: 'Please wait...'});
      let apiData = {
        'user' : this.user_id,
        'data' : this.input
      };
      loader.present().then(() => {
        let self = this
        let id = quiz.id

        this.apiService.postQuizResponse(id, apiData).subscribe(
          data => {
              console.log(data)

              // fetch results
              self.apiService.userFormResults(self.user_id, id).subscribe(
              data => {
                loader.dismiss()

                // let b = document.getElementById('quiz-info-' + id)
                // if (b) b.scrollIntoView({ behavior: "smooth", block: 'end' })
                // add delay here
                setTimeout(function() {
                  // to hide spinner
                  // quiz = null
                  quiz.results = data.data

                  // delay before scroll
                  setTimeout(function() {
                    let el = document.getElementById('quiz-result-' + quiz.id)
                    let offset = self.content.getContentDimensions().scrollHeight - (el.scrollHeight + 180)
                    self.content.scrollTo(0, offset);
                  }, 100)
                }, 500)
              }, error => {
                loader.dismiss();
                console.log(error)
              });

          },
          error => { 
            console.log(error)
            loader.dismiss()
          }
        );
      });
    }
  }


  onCompleted() {
    // update to start / not completed
    this.loader = this.loadingCtrl.create({ duration: 10000 });
    this.loader.present().then(() => {
        this
          .apiService
          .updateWellbeingMinute(
            this.user_id, {
              wb_id: this.wb_minute.ID, 
              status: STATUS_COMPLETED,
              action: 'change_status'
            }
          )

          // success
          .subscribe((data) => {
            // dismiss loader
            this.loader.dismiss()
            // notify home to check wellbeing minute
            this.events.publish('app:checkminute');
            this.navCtrl.popToRoot()

          // with error
          }, error => {
            this.loader.dismiss()
          })
    })
  }

  checkMinute(userID) {
    this.user_wb_minute = false;

    //wb_minute_check current user and expiry
    this.apiService.getUserWbMinute(userID).subscribe((data)=>{      
      // validate data to avoid errors when wellbeing minute is not available
      if (!data.data || !data.data.ID) {
        this.showAlert('Error', 'User does not belong to this wellbeing minute', () => this.goback())
        return
      }
     this.link = data.data.ID;
     this.getWbMinute(this.link);
 
    });
  }

  getWbMinute(id){
    this.apiService.getWellbeingMinute(id, this.user_id).subscribe(
      ({data}) => {    

        // dismiss loader
        this.loader.dismiss()

        let self = this

        // give time to hide the loader first
        setTimeout(() => {

          // if post not found
          if (data.post === null) {
            // with post meta found, only user is not found otherwise this post not found
            let mess = data.post_meta.length > 0 ? 'User does not belong to this wellbeing minute' : 'Wellbeing Minute not found.'
            // show error message
            self.showAlert('Error', mess, () => self.goback())
            return


          // if theres an error
          } else if (data.status === false) {
            // show error message
            self.showAlert('Error', data.message)
            return
          } else if (data.post_expired) {
            // show expire notification
            self.showAlert('Sorry', 'Wellbeing Minute has just expired.', () => self.goback())
            return
          }

          self.wb_base_url = data.url
          self.wb_minute = data.post;
          self.wb_minute_title = self.wb_minute.post_title; 
          // console.log('content: ', self.wb_minute.post_content.split("\n\n"))
          self.wb_minute_content = ProcessBlocks(self.wb_minute.post_content, self, document);
          self.is_loading = false

          // process post meta data
          self.processPostMeta(data.post_meta)
          // check status update
          self.processPostStatus(data.post.status)

          // process content embedded section
          // process links
          setTimeout(() => {
            // ProcessEmbed(document);
            ProcessLinks(document);
          }, 500)

          // process content 

        }, 500)

      },

      // fail to get wellbeing minute details
      error => {
        this.loader.dismiss()
        this.showAlert('Error', 'Cant find details for the wellbeing minute', () => this.goback())
      }

    );
  }

  goback() {
    // notify home to check wellbeing minute
    this.events.publish('app:checkminute');
    this.navCtrl.popToRoot()
  }


  showAlert(title, message, ok = null) {

    let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: [{ text: 'OK', handler: ok }]
    })
    alert.present()
  }

  invertHex(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    return '#' + (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
  }

}
