import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TcModalPage } from './tc-modal';

@NgModule({
  declarations: [
    TcModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TcModalPage),
  ],
 
})
export class TcModalPageModule {}
