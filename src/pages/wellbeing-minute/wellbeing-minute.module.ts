import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WellbeingMinutePage } from './wellbeing-minute';
import { SafeHtmlPipe } from '../../pipes/safe-html/safe-html';

@NgModule({
  declarations: [
    WellbeingMinutePage,
    SafeHtmlPipe
  ],
  imports: [
    IonicPageModule.forChild(WellbeingMinutePage),
  ],
})
export class WellbeingMinutePageModule {}
