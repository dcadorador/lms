import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,IonicPage } from 'ionic-angular';
import { UserService } from '../../app/services/user.service';
import { ApiService } from '../../app/services/api.service';
import { AuthService } from '../../app/services/auth.service';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {
  structure?: any;
  result?: any;
  type?: any;
  tool_type?: any;
  tool_post?: any;
  tool_post_meta?: any;
  tool_result_description?: any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apiService: ApiService,
    public userService: UserService,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
  ) {
    let loader = this.loadingCtrl.create({ duration: 10000 });
    this.structure = this.navParams.get('tool_form');
    this.tool_type = this.navParams.get('type');
    if(this.tool_type = 'user_tool') {
      this.tool_post = JSON.parse(localStorage.getItem('user_tool')).data;
    } else {
      this.tool_post = JSON.parse(localStorage.getItem('tool')).data;
    }
    
    //console.log(this.tool_post);
    //console.log(this.structure)
    loader.present().then(() => {
      this.apiService.userFormResults(this.userService.userId,this.structure.id).subscribe(
        data => {
           console.log(data.data);
           this.result = data.data;
           this.type = data.data.type;
           },
          error => console.log(error)
      );
      this.apiService.post(this.tool_post.ID).subscribe(
        data => {
          if (data.data) {
            let tool_post_meta = data.data.meta;
            tool_post_meta.forEach((meta) =>{
              if(meta.meta_key == 'tool_results_description') {
                this.tool_result_description = meta.meta_value;
                console.log(this.tool_result_description);
              }
            });
          }
          loader.dismiss();
        },
        error => console.log(error)
      );
      loader.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsPage');
  }

  backToHome(){
    this.navCtrl.popToRoot();
  }

}
