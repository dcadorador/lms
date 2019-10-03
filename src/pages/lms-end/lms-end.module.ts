import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LmsEndPage } from './lms-end';
import { ComponentsModule  } from '../../components/components.module';
@NgModule({
  declarations: [
    LmsEndPage,
  ],
  imports: [
    IonicPageModule.forChild(LmsEndPage),
    ComponentsModule 
  ],
})
export class LmsEndPageModule {}
