import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WebinarModalPage } from './webinar-modal';

@NgModule({
  declarations: [
    WebinarModalPage,
  ],
  imports: [
    IonicPageModule.forChild(WebinarModalPage),
  ],
})
export class WebinarModalPageModule {}
