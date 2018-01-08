import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemmodalPage } from './itemmodal';

@NgModule({
  declarations: [
    ItemmodalPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemmodalPage),
  ],
  exports: [
    ItemmodalPage
  ]
})
export class ItemmodalPageModule {}
