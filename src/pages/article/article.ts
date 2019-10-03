import { Component } from '@angular/core';
import { NavController, NavParams,IonicPage} from 'ionic-angular';

/**
 * Generated class for the ArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage {
  article: any = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.article = this.navParams.get('article');
    console.log(this.article);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlePage');
  }

}
