import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WebinarPage } from './webinar';

@NgModule({
  declarations: [
    WebinarPage,
  ],
  imports: [
    IonicPageModule.forChild(WebinarPage),
  ],
})
export class WebinarPageModule {}
