import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LmsActivityPage } from './lms-activity';
import { ComponentsModule  } from '../../components/components.module';
@NgModule({
  declarations: [
    LmsActivityPage,
  ],
  imports: [
    IonicPageModule.forChild(LmsActivityPage),
    ComponentsModule 
  ],
})
export class LmsActivityPageModule {}
