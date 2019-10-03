import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiteBookPage } from './lite-book';

@NgModule({
  declarations: [
    LiteBookPage,
  ],
  imports: [
    IonicPageModule.forChild(LiteBookPage),
  ],
})
export class LiteBookPageModule {}
