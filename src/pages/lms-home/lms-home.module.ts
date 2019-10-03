import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LmsHomePage } from './lms-home';

@NgModule({
  declarations: [
    LmsHomePage,
  ],
  imports: [
    IonicPageModule.forChild(LmsHomePage),
  ],
})
export class LmsHomePageModule {}
