import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiteHomePage } from './lite-home';

@NgModule({
  declarations: [
    LiteHomePage,
  ],
  imports: [
    IonicPageModule.forChild(LiteHomePage),
  ],
})
export class LiteHomePageModule {}
