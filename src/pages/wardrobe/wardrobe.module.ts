import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WardrobePage } from './wardrobe';

@NgModule({
  declarations: [
    WardrobePage,
  ],
  imports: [
    IonicPageModule.forChild(WardrobePage),
  ],
})
export class WardrobePageModule {}
