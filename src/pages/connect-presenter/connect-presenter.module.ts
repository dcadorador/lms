import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConnectPresenterPage } from './connect-presenter';

@NgModule({
  declarations: [
    ConnectPresenterPage,
  ],
  imports: [
    IonicPageModule.forChild(ConnectPresenterPage),
  ],
})
export class ConnectPresenterPageModule {}
