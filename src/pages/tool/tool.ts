import { Component } from '@angular/core';
import { Events, NavController, NavParams, LoadingController, AlertController ,IonicPage} from 'ionic-angular';
import { ApiService } from '../../app/services/api.service';
import { UserService } from '../../app/services/user.service';
import { AuthService } from '../../app/services/auth.service';

@IonicPage()
@Component({
  selector: 'page-tool',
  templateUrl: 'tool.html',
})
export class ToolPage {
  tool: any;
  tool_form: any;
  input: any [] = [];
  results: any;
  tool_page_description: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public apiService: ApiService,
    public userService: UserService,
    public authService: AuthService,
    public alertCtrl: AlertController,
    private events: Events
  ) {
    this.tool = this.navParams.get('tool');
    let loader = this.loadingCtrl.create({ duration: 10000 });
    
    console.log(this.tool);
    loader.present().then(() => { 
      if(this.tool){
        this.tool.meta.forEach((meta) =>{
            if(meta.meta_key == '_assessment_quiz_id') {
              this.apiService.postForm(meta.meta_value).subscribe(
                data => {
                  this.tool_form = data.data.structure;
                  //console.log(this.tool_form.description);
                  //loader.dismiss();
                },
                error => console.log(error)
              );
            }
        });  
      }
      /*this.tool.meta.forEach((meta) =>{
        if(meta.meta_key == 'tool_description') {
          this.tool_page_description = meta.meta_value;
          console.log(this.tool_page_description);
        }
      });*/
      this.apiService.post(this.tool.ID).subscribe(
        data => {
          let self = this
          setTimeout(() => {
            let tool_meta = data.data.meta;
            tool_meta.forEach((meta) =>{
              if(meta.meta_key == 'tool_description') {
                self.tool_page_description = meta.meta_value;
                console.log(self.tool_page_description);
              }
            });
          }, 500)
          loader.dismiss();
        },
        error => {
          console.log(error)
          loader.dismiss();
        }
      );
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ToolPage');
  }

  ionViewWillEnter() {
    // notify app home to check service again
    this.events.publish('app:checkservice')
  }

  onChange(choice,index){
    console.log('index_' + index + ' ' + choice);
    let idx = 'index_' + index;
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
    }
    this.input.push(obj);
    //console.log(this.input);
  }

  getStyle(i){
    i = i + 1;
    if(i % 2 == 1){
      return 'white'
    } else {
      return '#DCDDDE';
    }
  }

  getPaddingTop(i){
    i = i + 1;
    if(i % 2 == 1){
      return '1.75%'
    }
  }

  getPaddingBottom(i){
    i = i + 1;
    if(i % 2 == 1){
      return '7%'
    }
  }

  onSubmit(){

    // prevent form from submitting when there is no form id provided
    if (!this.tool_form) {
        let alert = this.alertCtrl.create({
            title: 'Form Error',
            subTitle: '<br><small>[ERROR][APP] A100</small><br> Cannot submit now <br><br> <b>Please try to refresh the page.</b>',
            buttons: ['OK']
        });
        alert.present()
        return
    }

    //console.log(this.tool_form);
    //console.log(this.input);

    /**
     * DECLARE VARIABLES
     */
    let field_counter = 0;
    let tool_fields = this.tool_form.fields;
    let question_num = [];
    let input_num = [];
    let missing_input = '';
    //console.log(tool_fields);

    /**
     * Loop through the form fields that is required
     */
    tool_fields.forEach((field) =>{
      if(field.isRequired == true) {
        field_counter = field_counter + 1;
        question_num.push(field.id)
      }
    });

    /**
     * Loop through the input fields that will be submitted
     */
    this.input.forEach((field) =>{
      field.forEach(item => {
        let str = 'index';
        if(item.includes(str)){
          input_num.push(parseInt(item.replace('index_','')));
        }
      })
    });
    //console.log(question_num);
    //console.log(input_num);

    /**
     * Run the checker to see which fields are missing
     */
    let missing_num = this.checkDiff(question_num,input_num);
    console.log(missing_num);

    /**
     * Create the missing input message
     */
    missing_num.forEach((item) => {
        let n_item = item + ',';
        missing_input = missing_input + ' ' + n_item;
    });
    missing_input = missing_input.replace(/,\s*$/, "");
    //console.log(missing_input);

    /**
     * Determine if the input number is the same, if not
     * then show error, if the same submit to the api.
     */
    if(this.input.length < field_counter){
      let alert = this.alertCtrl.create({
        title: 'Quiz Form Error',
        subTitle: 'Please complete quiz form on number ' + missing_input + '.',
        buttons: ['OK']
      });
      alert.present();
    } else {
      let loader = this.loadingCtrl.create({ duration: 10000 });
      let apiData = {
        'user' : this.userService.userId,
        'data' : this.input
      };
      loader.present().then(() => {
        this.apiService.postQuizResponse(this.tool_form.id,apiData).subscribe(
          data => {
              console.log(data);
              loader.dismiss();

              // add delay to fix issue found in ios scroll not working
              let self = this
              setTimeout(() => {
                self.navCtrl.push('ResultsPage',{'tool_form': self.tool_form, 'type': self.tool.post_type});
              }, 500)
              },
          error => console.log(error)
        );
      });
    }
  }

  checkDiff(first, second) {
    for (var i=0; i<second.length; i++) {
        var index = undefined;
        while ((index = first.indexOf(second[i])) !== -1) {
            first.splice(index, 1);
        }
    }
    return first;
  }

}
