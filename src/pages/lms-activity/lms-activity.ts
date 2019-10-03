import { Component,ElementRef } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, LoadingController, PopoverController } from 'ionic-angular';
import { ApiService } from '../../app/services/api.service';
import { GlobalProvider } from '../../providers/global/global';
import { LmsPopoverPage } from '../lms-popover/lms-popover';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-lms-activity',
  templateUrl: 'lms-activity.html',
})
export class LmsActivityPage {
  lms: any= null;
  lms_title: any=null;
  lms_content: any = null;

  lms_quiz: any = null;
  lms_quiz_fields = [];
  lms_quiz_page: number = 1;
  lms_quiz_total_page: number = 0;
  lms_quiz_input = [];
  lms_course_id: any=null;

  constructor(public navCtrl: NavController,
    private loadingCtrl: LoadingController,
     public navParams: NavParams,
     private apiService: ApiService,
     public global: GlobalProvider,
     private events: Events,
     public element: ElementRef,
     private popoverCtrl: PopoverController,
     public sanitizer: DomSanitizer
  ) {
      
    this.lms_content = this.sanitizer.bypassSecurityTrustHtml(this.navParams.get('content'));
      this.lms_title = localStorage.getItem('lms_title');
      this.initModuleInfo();
      this.global.button_text = this.navParams.get('button_text') ? this.navParams.get('button_text') : "NEXT";

      this.lms_quiz = this.navParams.get('quiz_data');
      if (this.lms_quiz) {
        this.lms_quiz.input_index = []

        // Determine if this is a single page or multiple
        if (this.lms_quiz.pagination) {
          this.lms_quiz_total_page = this.lms_quiz.pagination.pages.length
          this.onChangeQuizPage(1)

        // otherwise this is just a single page quiz
        } else {
          this.lms_quiz_fields = this.lms_quiz.fields
        }
      }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LmsActivityPage');
  }

  initModuleInfo() {
    if (!this.global.lms_module_title) {
      this.apiService.getLMSModuleInfo().subscribe(
        data => {
          this.global.lms_module_title = data.current_module.module_title
          this.global.lms_progress = data.progress.computed
        },
        error => {}
      )
    }
  }

  onNext(){
    // check for pagination for quiz
    if (this.lms_quiz_total_page > 0 && this.lms_quiz_page < this.lms_quiz_total_page) {
      this.lms_quiz_page++
      this.onChangeQuizPage(this.lms_quiz_page)

      return
    }

    // if quiz, submit for assessment result
    if (this.lms_quiz) {
      this.onSubmitQuiz()
      return
    }

    let notes =this.element.nativeElement.querySelector('#lesson-notes');
    let id = localStorage.getItem('uesrID');     
    let lms_course_id= localStorage.getItem('lms_course_id');
   if(notes){
     this.events.publish('lms:next', {
      user_id : id,
      course_id : lms_course_id,
      current_content: 'course-lesson',
      params : {lessonNotes: notes.value}
     });
   }else{
    this.events.publish('lms:next', 'course-lesson');
   }
  }

  onChangeQuizPage(page) {
    this.lms_quiz_fields = null
    let self = this

    // allow dom to have time to react the changes
    setTimeout(() => {
      self.lms_quiz_fields = [];
      self.lms_quiz.fields.forEach(field => {
        if (field.pageNumber === self.lms_quiz_page)
          self.lms_quiz_fields.push(field)
      })
    }, 200)
    

    console.log('change quiz page : ', this.lms_quiz_fields)
  }

  onSubmitQuiz() {
    // prevent form from submitting when there is no form id provided

    let question_required = []
    let field_counter = 0
    let missing_input = ''

    // Loop through the form fields that is required
    this.lms_quiz.fields.forEach((field, index) => {
        if(field.isRequired == true) {
          field_counter = field_counter + 1;
          question_required.push(index + 1)
        }
    })

    // Run the checker to see which fields are missing
    let missing_num = this.global.checkDiff(question_required, this.lms_quiz.input_index);
    

    // Create the missing input message
    missing_num.forEach((item) => {
        let n_item = item + ',';
        missing_input = missing_input + ' ' + n_item;
    });
    missing_input = missing_input.replace(/,\s*$/, "");

    // console.log('field counter : ', field_counter);
    // console.log('input : ', this.lms_quiz_input);
    // console.log('missing : ', missing_num);
    // console.log('input index : ', this.lms_quiz.input_index);

    /**
     * Determine if the input number is the same, if not
     * then show error, if the same submit to the api.
     */
    if(this.lms_quiz_input.length < field_counter){
      this.global.showAlert('Quiz Form Error', 'Please complete quiz form on number ' + missing_input + '.')
      // this.showAlert('Quiz Form Error', 'Please complete quiz form on number ' + missing_input + '.')
    } else {
      let userId = localStorage.getItem('userID');
      let loader = this.loadingCtrl.create({content: 'Please wait...'});
      let apiData = {
        'user' : userId,
        'data' : this.lms_quiz_input
      };
      loader.present().then(() => {
        let self = this
        let id = this.lms_quiz.id

        this.apiService.postQuizResponse(id, apiData).subscribe(
          data => {

              loader.dismiss()

              // checks for quiz response
              if (!data.data || !data.data.entry_id) {
                this.global.showAlert('Quiz Form Error', 'Unable to submit quiz, there seems to be a problem. <br><br>Please try agian later.')
                return
              }

              // save lesson_entry_id when we know that this quiz was set to have an assessment result
              let params = { 'lesson_entry_id': data.data.entry_id }

              // execute next lms
              self.events.publish('lms:next', {
                current_content: 'course-lesson',
                params: params
              })
          },
          error => { 
            console.log(error)
            loader.dismiss()
          }
        );
      });

    }

  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(LmsPopoverPage);
    popover.present({ev: event});   
  }

}
