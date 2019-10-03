import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LmsReportsPage } from './lms-reports';

@NgModule({
  declarations: [
    LmsReportsPage,
  ],
  imports: [
    IonicPageModule.forChild(LmsReportsPage),
  ],
})
export class LmsReportsPageModule {}
