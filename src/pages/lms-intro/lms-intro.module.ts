import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LmsIntroPage } from './lms-intro';

@NgModule({
  declarations: [
    LmsIntroPage,
  ],
  imports: [
    IonicPageModule.forChild(LmsIntroPage),
  ],
})
export class LmsIntroPageModule {}
