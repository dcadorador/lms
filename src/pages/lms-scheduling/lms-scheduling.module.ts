import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LmsSchedulingPage } from './lms-scheduling';
import { ComponentsModule  } from '../../components/components.module';

@NgModule({
  declarations: [
    LmsSchedulingPage,
  ],
  imports: [
    IonicPageModule.forChild(LmsSchedulingPage),
    ComponentsModule 
  ],
})
export class LmsSchedulingPageModule {}
