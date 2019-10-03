import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiteContactPage } from './lite-contact';

@NgModule({
  declarations: [
    LiteContactPage,
  ],
  imports: [
    IonicPageModule.forChild(LiteContactPage),
  ],
})
export class LiteContactPageModule {}
