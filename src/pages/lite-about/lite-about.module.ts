import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiteAboutPage } from './lite-about';

@NgModule({
  declarations: [
    LiteAboutPage,
  ],
  imports: [
    IonicPageModule.forChild(LiteAboutPage),
  ],
})
export class LiteAboutPageModule {}
