import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LmsSummaryPage } from './lms-summary';
import { ComponentsModule  } from '../../components/components.module';
@NgModule({
  declarations: [
    LmsSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(LmsSummaryPage),
    ComponentsModule 
  ],
})
export class LmsSummaryPageModule {}
