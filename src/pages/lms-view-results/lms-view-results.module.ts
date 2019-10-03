import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LmsViewResultsPage } from './lms-view-results';
import { ComponentsModule  } from '../../components/components.module';
@NgModule({
  declarations: [
    LmsViewResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(LmsViewResultsPage),
    ComponentsModule 
  ],
})
export class LmsViewResultsPageModule {}
