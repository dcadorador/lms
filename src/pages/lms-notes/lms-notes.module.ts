import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LmsNotesPage } from './lms-notes';

@NgModule({
  declarations: [
    LmsNotesPage,
  ],
  imports: [
    IonicPageModule.forChild(LmsNotesPage),
  ],
})
export class LmsNotesPageModule {}
